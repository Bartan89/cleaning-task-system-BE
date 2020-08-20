"use strict"

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "artworks",
      [
        {
          title: "Woman in red dress at seaside",
          imageUrl: "https://cdn.shopify.com/s/files/1/0649/8987/products/M19048_Joyful_in_Hope_900_x_1300_400x.jpg?v=1585824549",
          heart: 2,
          minimumBid: 15,
          userId: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: "Bathers bathing Bourgeois",
          imageUrl: "https://cdnb.artstation.com/p/assets/images/images/000/543/295/smaller_square/david-le-merrer-10455222-581613681957822-4870497303775543359-n.jpg?1426222157",
          heart: 0,
          minimumBid: 100,
          userId: 2,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: "Ship that comes in the night and brings bad news",
          imageUrl: "https://barnebys.imgix.net/https%3A%2F%2Fwww.seizedpropertyauctions.com%2FItemImages%2F000014%2F14801a_med.jpeg?auto=format%2Ccompress&crop=0&cs=tinysrgb&fit=crop&h=400&ixlib=php-2.2.0&trim=auto&w=400&s=96beca81fdbe20da020cd6c234d67e54",
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
