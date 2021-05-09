"use strict"

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "artworks",
      [
        {
          title: "Vacuum all public spaces",
          imageUrl: "https://www.tristar.eu/product/image/medium/sz-2135_0.jpg",
          heart: 2,
          minimumBid: 15,
          userId: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: "Clean out the dishwasher",
          imageUrl: "https://electromall.net/media/2021/02/hisense-12-place-dishwasher-h12dss.jpg",
          heart: 0,
          minimumBid: 100,
          userId: 2,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: "Take out the trash",
          imageUrl: "https://mobileimages.lowes.com/product/converted/029274/029274408046.jpg?size=xl",
          heart: 3,
          minimumBid: 120,
          userId: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    )
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("artworks", null, {})
  }
}
