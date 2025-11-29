'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Log extends Model {
    static associate(models) {
      Log.belongsTo(models.Organisation, { foreignKey: 'organisation_id' });
      Log.belongsTo(models.User, { foreignKey: 'user_id' });
    }
  }

  Log.init(
    {
      organisation_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      action: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      meta: {
        type: DataTypes.TEXT,
      },
    },
    {
      sequelize,
      modelName: 'Log',
      tableName: 'Logs',

      // ✅✅ THIS IS THE ROOT FIX
      timestamps: true,          // enables createdAt & updatedAt
      underscored: true,         // uses created_at, updated_at in DB
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    }
  );

  return Log;
};
