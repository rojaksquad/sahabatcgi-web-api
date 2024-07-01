'use strict';
const {
  Model
} = require('sequelize');

const sequelizePaginate = require('sequelize-paginate');

module.exports = (sequelize, DataTypes) => {
  class DataObat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  DataObat.init({
    nama_obat: DataTypes.STRING,
    list_dosis: DataTypes.STRING,
    kategori: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'DataObat',
  });

  sequelizePaginate.paginate(DataObat);

  return DataObat;
};