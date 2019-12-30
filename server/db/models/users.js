'use strict';
module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('users', {
    username: DataTypes.STRING,
    password: DataTypes.STRING
  }, {});
  Users.associate = function(models) {
    // associations can be defined here
  };
  return Users;
};