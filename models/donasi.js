'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Donasi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Donasi.init({
    title: {
      type: DataTypes.STRING,
      validate: {
        isString(value) {
          if (typeof value !== 'string') {
            throw new Error('Title must be a string');
          }
        },
      },
    },
    image_url: DataTypes.STRING,
    content: DataTypes.TEXT,
    donate_link: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Donasi',
  });
  return Donasi;
};