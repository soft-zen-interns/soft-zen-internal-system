'use strict';
module.exports = (sequelize, DataTypes) => {
  const clients = sequelize.define('clients', {
    name: DataTypes.STRING,
    contactName: DataTypes.STRING,
    email: DataTypes.STRING,
    type: DataTypes.STRING,
    country: DataTypes.STRING,
    totalRevenues: DataTypes.FLOAT,
    totalCosts: DataTypes.FLOAT,
    totalProfit: DataTypes.FLOAT,
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE
  }, {});
  clients.associate = function(models) {
    // associations can be defined here
  };
  return clients;
};