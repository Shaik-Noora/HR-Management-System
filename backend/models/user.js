'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.belongsTo(models.Organisation, { foreignKey: 'organisation_id' });
      User.hasMany(models.Log, { foreignKey: 'user_id' });
    }
  }

  User.init({
    email: DataTypes.STRING,
    name: DataTypes.STRING,
    password_hash: DataTypes.STRING,
    organisation_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'Users',
    timestamps: false
  });

  return User;
};
