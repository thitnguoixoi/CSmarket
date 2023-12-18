'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cases_Skins extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Cases_Skins.belongsTo(models.Cases, { foreignKey: "CaseID" })
      Cases_Skins.belongsTo(models.Skins, { foreignKey: "SkinID" })
    }
  }
  Cases_Skins.init({
    CaseID: DataTypes.INTEGER,
    SkinID: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Cases_Skins',
  });
  return Cases_Skins;
};