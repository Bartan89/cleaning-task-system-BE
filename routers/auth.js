const bcrypt = require("bcrypt")
const { Router } = require("express")
const { toJWT } = require("../auth/jwt")
const authMiddleware = require("../auth/middleware")
const User = require("../models/").user
const { SALT_ROUNDS } = require("../config/constants")

const router = new Router()

router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).send({ message: "Please provide both email and password" })
    }

    const user = await User.findOne({ where: { email } })

    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(400).send({
        message: "User with that email not found or password incorrect"
      })
    }

    delete user.dataValues["password"] // don't send back the password hash
    const token = toJWT({ userId: user.id })
    return res.status(200).send({ token, ...user.dataValues })
  } catch (error) {
    console.log(error)
    return res.status(400).send({ message: "Something went wrong, sorry" })
  }
})

router.post("/signup", async (req, res) => {
  try {
    const { email, password, name, isArtist } = req.body
    if (!email || !password || !name) {
      return res.status(400).send("Please provide an email, password, a name and if you are a artist or not")
    }

    try {
      const newUser = await User.create({
        email,
        password: bcrypt.hashSync(password, SALT_ROUNDS),
        name,
        isArtist,
        credit : 0
      })

      delete newUser.dataValues["password"] // don't send back the password hash

      const token = toJWT({ userId: newUser.id })

      res.status(201).json({ token, ...newUser.dataValues })
    } catch (error) {
      if (error.name === "SequelizeUniqueConstraintError") {
        return res.status(400).send({ message: "There is an existing account with this email" })
      }

      return res.status(400).send({ message: "Something went wrong, sorry" })
    }
  } catch (error) {
    console.log(error.message)
  }
})

// The /me endpoint can be used to:
// - get the users email & name using only their token
// - checking if a token is (still) valid
router.get("/me", authMiddleware, async (req, res) => {
  // don't send back the password hash
  delete req.user.dataValues["password"]
  res.status(200).send({ ...req.user.dataValues })
})

router.get("/all-users", async (req, res) => {
  const user  = await User.findAll({
    attributes: ['name', 'credit', 'id']
  })

  // if(user) {
  //   user.array.forEach(element => {
  //     console.log(element)
  //   });
  // }

  const sendThis = user


  res.status(200).send(sendThis)
})


router.post("/add-credit", async(req, res) => {
  
  const email  = req.body.email;
  const user = await User.findOne({ where: { email } })

  user.increment('credit', { by: req.body.amount });
  res.status(200)
})

module.exports = router

//11