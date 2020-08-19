const { Router } = require("express")
const Artwork = require("../models").artwork
const Bid = require("../models").bid
const User = require("../models").user
const auth = require("../auth/middleware")

const router = new Router()

router.get("/", async (req, res) => {
  const limit = req.query.limit || 10
  const offset = req.query.offset || 0
  const artworks = await Artwork.findAndCountAll({
    limit,
    offset,
    include: [Bid]
    // order: [[Story, "createdAt", "DESC"]]
  })
  res.status(200).send({ message: "ok", artworks })
})

router.get("/:id", async (req, res) => {
  const { id } = req.params

  console.log(id)
  if (isNaN(parseInt(id))) {
    return res.status(400).send({ message: "Artwork id is not a number" })
  }

  const artwork = await Artwork.findByPk(id, {
    include: [Bid, User]
    // include: [User]
    // order: [[Story, "createdAt", "DESC"]]
  })

  if (artwork === null) {
    return res.status(404).send({ message: "Artwork not found" })
  }

  res.status(200).send({ message: "ok", artwork })
})

router.patch("/:id", async (req, res) => {
  const { id } = req.params

  console.log(id)
  if (isNaN(parseInt(id))) {
    return res.status(400).send({ message: "Artwork id is not a number" })
  }

  const artwork = await Artwork.findByPk(id, {
    //include: [Bid, User]
    // include: [User]
    // order: [[Story, "createdAt", "DESC"]]
  })

  if (artwork === null) {
    return res.status(404).send({ message: "Artwork not found" })
  }

  const { heart } = req.body

  await artwork.update({ heart })

  res.status(200).send({ message: "ok", artwork })
})

router.post("/:id/bids", auth, async (req, res) => {
  try {
    const artworkId = req.params.id

    const highestBidSoFar = await Bid.max("amount", {
      where: { artworkId: artworkId }
    })

    const artwork = await Artwork.findByPk(artworkId)
    console.log(artwork)

    const { email, amount } = req.body

    if (highestBidSoFar >= amount) {
      return res.status(400).send({ message: "There is a higher or equal bid already in the database" })
    }

    if (artwork.minimumBid >= amount) {
      return res.status(400).send({ message: "Your bid is lower then the minimum bid set by the artist" })
    }

    const bid = await Bid.create({
      email,
      amount,
      artworkId: artworkId
    })

    console.log(bid)
    return res.status(201).send({ message: "Bid added to database", bid })
  } catch (error) {
    console.log(error.message)
  }
})

router.post("/", auth, async (req, res) => {
  try {
    const { title, imageUrl, minimumBid, userId } = req.body

    const artwork = await Artwork.create({
      title,
      imageUrl,
      minimumBid,
      userId
    })

    console.log(artwork)
    return res.status(201).send({ message: "Bid added to database", artwork })
  } catch (error) {
    console.log(error.message)
  }
})
// if (homepage === null) {
//   return res.status(404).send({ message: "This homepage does not exist" });
// }

// if (!homepage.userId === req.user.id) {
//   return res
//     .status(403)
//     .send({ message: "You are not authorized to update this homepage" });
// }

// if (!name) {
//   return res.status(400).send({ message: "A story must have a name" });
// }

module.exports = router
