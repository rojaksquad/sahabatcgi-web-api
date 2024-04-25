'use strict';
const {
  Model
} = require('sequelize');
const { v4: uuidv4 } = require('uuid');
const sequelizePaginate = require('sequelize-paginate');

module.exports = (sequelize, DataTypes) => {
  class Pengurus extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Pengurus.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: () => uuidv4(),
    },
    username: { 
      type: DataTypes.STRING,
      unique: true
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
    superUser: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Pengurus',
  });

  sequelizePaginate.paginate(Pengurus);

  return Pengurus;
};