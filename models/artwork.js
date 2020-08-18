"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
  class artwork extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      artwork.belongsTo(models.user)
      artwork.hasMany(models.bid)
      // define association here
    }
  }
  artwork.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      imageUrl: {
        type: DataTypes.STRING,
        allowNull: false
      },
      heart: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      minimumBid: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: "artwork"
    }
  )
  return artwork
}
