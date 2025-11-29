'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Employee extends Model {
    static associate(models) {
      Employee.belongsTo(models.Organisation, {
        foreignKey: 'organisation_id'
      });

      Employee.belongsToMany(models.Team, {
        through: models.EmployeeTeam,
        foreignKey: 'employee_id',
        otherKey: 'team_id'
      });
    }
  }

  Employee.init({
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    organisation_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Employee',
    tableName: 'Employees',
    timestamps: false
  });

  return Employee;
};
