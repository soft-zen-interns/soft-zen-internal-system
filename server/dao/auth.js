const db = require("../utils/mySQLPool");
const Sequelize = require('sequelize');

const sequelize = new Sequelize('softzen', 'root', 'rootroot', {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql'
});

const users = sequelize.define('users', {
    id: {
        primaryKey: true,
        type: Sequelize.INTEGER,
    },
    username: Sequelize.STRING,
    password: Sequelize.STRING
});

module.exports.getUsersByUsername = (username) => {
    return db.query('SELECT * FROM `users` WHERE `username` = \'username\'')
}

module.exports.createUser = (username, password) => {
    return users.create({
        username: username,
        password: password
    })
}