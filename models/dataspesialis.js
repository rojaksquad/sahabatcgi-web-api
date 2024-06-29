'use strict';
const {
  Model
} = require('sequelize');
const sequelizePaginate = require('sequelize-paginate');

module.exports = (sequelize, DataTypes) => {
  class DataSpesialis extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  DataSpesialis.init({
    nama_spesialis: DataTypes.STRING,
    deskripsi: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'DataSpesialis',
  });

  sequelizePaginate.paginate(DataSpesialis);

  return DataSpesialis;
};