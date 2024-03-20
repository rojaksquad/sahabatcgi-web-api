'use strict';
const { Model } = require('sequelize');
const sequelizePaginate = require('sequelize-paginate');

module.exports = (sequelize, DataTypes) => {
  class Blog extends Model {
    static associate(models) {
      // Define associations here
    }
  }

  Blog.init({
    author_id: DataTypes.STRING,
    author_name: DataTypes.STRING,
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    isVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false // Set the default value to false
    }
  }, {
    sequelize,
    modelName: 'Blog',
  });

  sequelizePaginate.paginate(Blog);

  return Blog;
};
