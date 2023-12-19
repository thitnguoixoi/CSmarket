'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Skins extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Skins.belongsToMany(models.Users, { through: models.Users_Skins, foreignKey: 'SkinID', otherKey: 'UserID' })
      Skins.belongsToMany(models.Cases, { through: models.Cases_Skins, foreignKey: 'SkinID', otherKey: 'CaseID' })
    }
  }
  Skins.init({
    Type: DataTypes.STRING,
    Name: DataTypes.STRING,
    Float: DataTypes.STRING,
    Price: DataTypes.FLOAT,
    Rating: DataTypes.STRING,
    Image: DataTypes.STRING,
    Count: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Skins',
  });
  return Skins;
};