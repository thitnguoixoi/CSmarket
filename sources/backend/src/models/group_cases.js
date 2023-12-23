'use strict';
const {
  Model
} = require('sequelize');
const cases = require('./cases');
module.exports = (sequelize, DataTypes) => {
  class Group_Cases extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Group_Cases.hasMany(models.Cases, { foreignKey: 'id' })
    }
  }
  Group_Cases.init({
    CaseID: DataTypes.INTEGER,
    Name: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Group_Cases',
  });
  return Group_Cases;
};