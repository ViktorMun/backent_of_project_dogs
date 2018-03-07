

'use strict';
module.exports = (sequelize, DataTypes) => {
  var Top = sequelize.define('tops', {
    dogname: DataTypes.STRING,
    subdogsname: DataTypes.STRING,
    score: DataTypes.INTEGER,
    picture: DataTypes.STRING,
  }, {});
  Top.associate = function(models) {
    // associations can be defined here
  };
  return Top;
};
