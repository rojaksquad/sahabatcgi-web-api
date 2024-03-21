'use strict';
const { Model } = require('sequelize');
const sequelizePaginate = require('sequelize-paginate');

module.exports = (sequelize, DataTypes) => {
  class BlogComment extends Model {
    static associate(models) {
      // define association here
    }
  }
  
  BlogComment.init({
    blog_id: {
      type: DataTypes.INTEGER, // Corrected to integer
      allowNull: false // Not nullable
    },
    user_id: {
      type: DataTypes.STRING,
      allowNull: false // Not nullable
    },
    user_name: {
      type: DataTypes.STRING,
      allowNull: false, // Not nullable
      validate: {
        isString(value) {
          if (typeof value !== 'string') {
            throw new Error('User Name must be a string');
          }
        },
      }
    },
    content: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'BlogComment',
  });

  sequelizePaginate.paginate(BlogComment);
  
  return BlogComment;
};
