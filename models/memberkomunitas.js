'use strict';
const { Model } = require('sequelize');
const sequelizePaginate = require('sequelize-paginate');

module.exports = (sequelize, DataTypes) => {
  class MemberKomunitas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  MemberKomunitas.init({
    full_name: DataTypes.STRING,
    jabatan: DataTypes.STRING,
    image_url: DataTypes.STRING,
    quote: {
      type: DataTypes.STRING,
      validate: {
        isString(value) {
          if (typeof value !== 'string') {
            throw new Error('Quote must be a string');
          }
        },
      },
    },
  }, {
    sequelize,
    modelName: 'MemberKomunitas',
  });

  sequelizePaginate.paginate(MemberKomunitas);

  return MemberKomunitas;
};