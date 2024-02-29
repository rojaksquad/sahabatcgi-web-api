'use strict';
const { Model } = require('sequelize');
const sequelizePaginate = require('sequelize-paginate');

module.exports = (sequelize, DataTypes) => {
  class ProfilKomunitas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ProfilKomunitas.init({
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
    content: DataTypes.TEXT,
    image_url: DataTypes.STRING,
    ig_link: DataTypes.STRING,
    twitter_link: DataTypes.STRING,
    fb_link: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ProfilKomunitas',
  });

  sequelizePaginate.paginate(ProfilKomunitas);

  return ProfilKomunitas;
};