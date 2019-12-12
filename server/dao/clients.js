const db = require("../utils/mySQLPool");

module.exports.getClients = () => {
  return db.query('SELECT * FROM clients ORDER BY id ASC');
};
