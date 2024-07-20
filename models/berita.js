'use strict';
const { Model } = require('sequelize');
const sequelizePaginate = require('sequelize-paginate');

module.exports = (sequelize, DataTypes) => {
  class Berita extends Model {
    static associate(models) {
      // define association here
    }
  }
  Berita.init({
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    image_url: DataTypes.STRING,
    kategori: DataTypes.ENUM('perkembanganKomunitas', 'perkembanganCML', 'GIST'),
    doi_link: DataTypes.TEXT,
    show: {
      type: DataTypes.BOOLEAN,
      defaultValue: true // Set a default value if needed
    }
  }, {
    sequelize,
    modelName: 'Berita',
  });

  sequelizePaginate.paginate(Berita);

  return Berita;
};
