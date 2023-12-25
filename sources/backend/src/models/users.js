'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Users.belongsTo(models.Group_Users, { foreignKey: 'GroupID' })
      Users.belongsToMany(models.Skins, { through: models.Users_Skins, foreignKey: 'UserID', otherKey: 'SkinID' })
    }
  }
  Users.init({
    SteamID: DataTypes.STRING,
    GroupID: DataTypes.INTEGER,
    TradeURL: DataTypes.STRING,
    Wallet: DataTypes.STRING,
    Personaname: DataTypes.STRING,
    Profileurl: DataTypes.STRING,
    Avatar: DataTypes.STRING,
    Avatarmedium: DataTypes.STRING,
    Avatarfull: DataTypes.STRING,
    CountOpen: DataTypes.INTEGER,
    CountUpgrade: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Users',
  });
  return Users;
};