'use strict';
const { Model } = require('sequelize');
const sequelizePaginate = require('sequelize-paginate');

module.exports = (sequelize, DataTypes) => {
  class AturanBlog extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  AturanBlog.init({
    title: DataTypes.STRING,
    content: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'AturanBlog',
  });

  sequelizePaginate.paginate(AturanBlog);

  return AturanBlog;
};