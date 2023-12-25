'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users_Skins extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Users_Skins.belongsTo(models.Users, { foreignKey: 'UserID' });
      Users_Skins.belongsTo(models.Skins, { foreignKey: 'SkinID' });

    }
  }
  Users_Skins.init({
    SkinID: DataTypes.INTEGER,
    UserID: DataTypes.INTEGER,
    Status: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Users_Skins',
  });
  return Users_Skins;
};