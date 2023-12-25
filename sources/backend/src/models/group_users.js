'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Group_Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Group_Users.belongsToMany(models.Roles, { through: models.Group_Roles, foreignKey: 'GroupID', otherKey: 'RoleID' })
    }
  }
  Group_Users.init({
    Name: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Group_Users',
  });
  return Group_Users;
};