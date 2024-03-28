'use strict';
const { Model } = require('sequelize');
const sequelizePaginate = require('sequelize-paginate');

module.exports = (sequelize, DataTypes) => {
  class ProfilKomunitas extends Model {
    static associate(models) {
      // Define associations here
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
    fb_link: DataTypes.STRING,
    visi: DataTypes.TEXT,
    misi: DataTypes.TEXT,
  }, {
    sequelize,
    modelName: 'ProfilKomunitas',
  });

  sequelizePaginate.paginate(ProfilKomunitas);

  return ProfilKomunitas;
};
