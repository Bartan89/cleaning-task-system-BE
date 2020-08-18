"use strict"
const bcrypt = require("bcrypt")
const { SALT_ROUNDS } = require("../config/constants")

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "users",
      [
        {
          name: "b",
          email: "b@b.com",
          isArtist: true,
          password: bcrypt.hashSync("b", SALT_ROUNDS),
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Frank de Vries",
          email: "FrankdeVries@outlook.com",
          isArtist: false,
          password: bcrypt.hashSync("a", SALT_ROUNDS),
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    )
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("users", null, {})
  }
}
