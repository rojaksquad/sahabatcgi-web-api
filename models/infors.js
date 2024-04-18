'use strict';
const {
  Model
} = require('sequelize');

const sequelizePaginate = require('sequelize-paginate');

module.exports = (sequelize, DataTypes) => {
  class InfoRS extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  InfoRS.init({
    nama_rs: {
      type: DataTypes.STRING,
      allowNull: false, // Not nullable
      validate: {
        isString(value) {
          if (typeof value !== 'string') {
            throw new Error('Name RS must be a string');
          }
        },
      }
    },
    lokasi_rs: DataTypes.STRING,
    image_url: DataTypes.STRING,
    link_maps: DataTypes.TEXT,
    latlong: DataTypes.TEXT,
    info_kontak: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'InfoRS',
  });

  sequelizePaginate.paginate(InfoRS);

  return InfoRS;
};