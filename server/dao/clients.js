const db = require("../utils/mySQLPool");
const Sequelize = require('sequelize');

const sequelize = new Sequelize('softzen', 'root', 'rootroot', {
  host: 'localhost',
  port: 3306,
  dialect: 'mysql'
});

const clients = sequelize.define('clients', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  name: {
    allowNull: false,
    type: Sequelize.STRING
  },
  contactName: {
    allowNull: false,
    type: Sequelize.STRING
  },
  email: {
    allowNull: false,
    type: Sequelize.STRING
  },
  type: {
    allowNull: false,
    type: Sequelize.STRING
  },
  country: {
    allowNull: false,
    type: Sequelize.STRING
  },
  totalRevenues: {
    defaultValue: 0,
    allowNull: false,
    type: Sequelize.FLOAT
  },
  totalCosts: {
    defaultValue: 0,
    allowNull: false,
    type: Sequelize.FLOAT
  },
  totalProfit: {
    defaultValue: 0,
    allowNull: false,
    type: Sequelize.FLOAT
  },
  startDate: {
    allowNull: false,
    type: Sequelize.DATE
  },
  endDate: {
    type: Sequelize.DATE,
    allowNull: true
  },
  createdAt: {
    allowNull: false,
    type: Sequelize.DATE
  },
  updatedAt: {
    allowNull: false,
    type: Sequelize.DATE
  }
});

module.exports.getClients = () => {
  return db.query('SELECT * FROM clients ORDER BY id ASC');
};

module.exports.createClient = (name,contactName,email,type,country,startDate,endDate) => {
  return clients.create({
    name: name,
    contactName: contactName,
    email: email,
    type: type,
    country: country,
    startDate: startDate,
    endDate: endDate,
  })
};

module.exports.updateClient = (clientId, name,contactName,email,type,country,startDate,endDate) => {
  return clients.update(
      {
        name: name,
        contactName: contactName,
        email: email,
        type: type,
        country: country,
        startDate: startDate,
        endDate: endDate,
      },
      { where: { id: clientId } }
  )
};

module.exports.deleteClient = (clientId) => {
  return clients.destroy({
    where: {
      id: clientId
    }
  });
};


