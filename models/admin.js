'use strict';
const { Model } = require('sequelize');
const sequelizePaginate = require('sequelize-paginate');

module.exports = (sequelize, DataTypes) => {
  class Admin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Define associations here
    }
  }

  Admin.init({
    email: {
      type: DataTypes.STRING,
      unique: true // Make email attribute unique
    },
    password: DataTypes.STRING,
    full_name: DataTypes.STRING,
    is_active: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Admin',
  });

  sequelizePaginate.paginate(Admin);

  return Admin;
};
