'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cases extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Cases.belongsTo(models.Group_Cases, { foreignKey: 'GroupID' })
      Cases.belongsToMany(models.Skins, { through: models.Cases_Skins, foreignKey: 'CaseID', otherKey: 'SkinID' })
    }
  }
  Cases.init({
    Name: DataTypes.STRING,
    Price: DataTypes.FLOAT,
    Image: DataTypes.STRING,
    GroupID: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Cases',
  });
  return Cases;
};