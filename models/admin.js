'use strict';
const { Model } = require('sequelize');
const { v4: uuidv4 } = require('uuid');
const sequelizePaginate = require('sequelize-paginate');

module.exports = (sequelize, DataTypes) => {
  class Admin extends Model {
    static associate(models) {
      // Define associations here
    }
  }

  Admin.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: () => uuidv4(),
    },
    username: { // Changed from email to username
      type: DataTypes.STRING,
      unique: true // Make username attribute unique
    },
    password: DataTypes.STRING,
    full_name: {
      type: DataTypes.STRING,
      validate: {
        isString(value) {
          if (typeof value !== 'string') {
            throw new Error('Full Name must be a string');
          }
        },
      },
    },
    is_active: DataTypes.BOOLEAN,
    superAdmin: DataTypes.BOOLEAN // New column
  }, {
    sequelize,
    modelName: 'Admin',
  });

  sequelizePaginate.paginate(Admin);

  return Admin;
};
