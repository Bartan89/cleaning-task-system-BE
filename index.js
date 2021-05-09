const express = require("express")
const loggerMiddleWare = require("morgan")
const corsMiddleWare = require("cors")
const { PORT } = require("./config/constants")
const authRouter = require("./routers/auth")
const artworkRouter = require("./routers/artwork")
const authMiddleWare = require("./auth/middleware")

const app = express()

app.use(loggerMiddleWare("dev"))

const bodyParserMiddleWare = express.json()
app.use(bodyParserMiddleWare)

app.use(corsMiddleWare())

if (process.env.DELAY) {
  app.use((req, res, next) => {
    setTimeout(() => next(), parseInt(process.env.DELAY))
  })
}

app.use("/artworks", artworkRouter)

// GET endpoint for testing purposes, can be removed
app.get("/", (req, res) => {
  res.send("Hi from express")
})

// POST endpoint for testing purposes, can be removed
app.post("/echo", (req, res) => {
  res.json({
    youPosted: {
      ...req.body
    }
  })
})

// POST endpoint which requires a token for testing purposes, can be removed
app.post("/authorized_post_request", authMiddleWare, (req, res) => {
  // accessing user that was added to req by the auth middleware
  const user = req.user
  // don't send back the password hash
  delete user.dataValues["password"]

  res.json({
    youPosted: {
      ...req.body
    },
    userFoundWithToken: {
      ...user.dataValues
    }
  })
})

app.use("/", authRouter)

// Listen for connections on specified port (default is port 4000)

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`)
})

/**
 * Middlewares
 *
 * It is advisable to configure your middleware before configuring the routes
 * If you configure routes before the middleware, these routes will not use them
 *
 */

/**
 * morgan:
 *
 * simple logging middleware so you can see
 * what happened to your request
 *
 * example:
 *
 * METHOD   PATH        STATUS  RESPONSE_TIME   - Content-Length
 *
 * GET      /           200     1.807 ms        - 15
 * POST     /echo       200     10.251 ms       - 26
 * POST     /puppies    404     1.027 ms        - 147
 *
 * github: https://github.com/expressjs/morgan
 *
 */
