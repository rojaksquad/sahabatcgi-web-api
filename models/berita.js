'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Berita extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Berita.init({
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    image_url: DataTypes.STRING,
    kategori: DataTypes.ENUM('perkembanganKomunitas', 'perkembanganCML'),
    doi_link: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Berita',
  });
  return Berita;
};