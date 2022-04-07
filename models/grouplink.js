"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class grouplink extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      grouplink.hasMany(models.links, {
        as: "links",
        foreignKey: {
          name: "idGroupLink",
        },
      });
    }
  }
  grouplink.init(
    {
      linkImage: DataTypes.STRING,
      title: DataTypes.STRING,
      description: DataTypes.STRING,
      uniqueLink: DataTypes.STRING,
      brandImage: DataTypes.STRING,
      viewCount: DataTypes.INTEGER,
      idUser: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "grouplink",
    }
  );
  return grouplink;
};
