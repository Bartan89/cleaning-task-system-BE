const { Router } = require("express")
const Artwork = require("../models").artwork
const Bid = require("../models").bid

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

module.exports = router
