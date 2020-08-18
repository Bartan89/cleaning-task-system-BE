"use strict"

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "bids",
      [
        {
          email: "arttraders24@traders.com",
          amount: 110,
          artworkId: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          email: "sandradevries@outlook.net",
          amount: 5400,
          artworkId: 2,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          email: "joemans88@gmail.com",
          amount: 70,
          artworkId: 3,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          email: "epic_ranger45@yahoo.net",
          amount: 900,
          artworkId: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          email: "Jan@jansen.com",
          amount: 55,
          artworkId: 2,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    )
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("bids", null, {})
  }
}
