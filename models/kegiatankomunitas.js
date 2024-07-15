'use strict';

const { Model } = require('sequelize');
const sequelizePaginate = require('sequelize-paginate');

module.exports = (sequelize, DataTypes) => {
  class KegiatanKomunitas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  KegiatanKomunitas.init({
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    image_url: DataTypes.STRING,
    date: DataTypes.DATEONLY,
    tempat: DataTypes.STRING,
    show: {
      type: DataTypes.BOOLEAN,
      defaultValue: true // Set a default value if needed
    }
  }, {
    sequelize,
    modelName: 'KegiatanKomunitas',
  });

  sequelizePaginate.paginate(KegiatanKomunitas);

  return KegiatanKomunitas;
};
