"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class links extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  links.init(
    {
      linkImage: DataTypes.STRING,
      title: DataTypes.STRING,
      url: DataTypes.STRING,
      idGroupLink: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "links",
    }
  );
  return links;
};
