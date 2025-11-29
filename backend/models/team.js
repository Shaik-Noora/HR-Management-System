'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Team extends Model {
    static associate(models) {
      Team.belongsTo(models.Organisation, {
        foreignKey: 'organisation_id'
      });

      Team.belongsToMany(models.Employee, {
        through: models.EmployeeTeam,
        foreignKey: 'team_id',
        otherKey: 'employee_id'
      });
    }
  }

  Team.init({
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    organisation_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Team',
    tableName: 'Teams',
    timestamps: false
  });

  return Team;
};
