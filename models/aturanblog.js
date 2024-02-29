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
    content: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'AturanBlog',
  });

  sequelizePaginate.paginate(AturanBlog);

  return AturanBlog;
};