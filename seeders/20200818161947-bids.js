"use strict"

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "bids",
      [
        // {
        //   email: "arttraders24@traders.com",
        //   amount: 20,
        //   artworkId: 1,
        //   createdAt: new Date(),
        //   updatedAt: new Date()
        // },
        // {
        //   email: "sandradevries@outlook.net",
        //   amount: 30,
        //   artworkId: 2,
        //   createdAt: new Date(),
        //   updatedAt: new Date()
        // },
      ],
      {}
    )
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("bids", null, {})
  }
}
