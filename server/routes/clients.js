const router = require('express').Router();
const bodyParser = require('body-parser');
const mysql = require('mysql');
const Sequelize = require('sequelize');

router.use(bodyParser.urlencoded({ extended: true }));

const sequelize = new Sequelize('softzen', 'root', 'rootroot', {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql'
});
const connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'rootroot',
    database: 'softzen'
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

router.post('/create', (req,res) => {
    let name = req.body.name;
    let contactName = req.body.contactName;
    let email = req.body.email;
    let type = req.body.type;
    let country = req.body.country;
    let totalRevenues = req.body.totalRevenues;
    let totalCosts = req.body.totalCosts;
    let totalProfit = req.body.totalProfit;
    let startDate = req.body.startDate;
    let endDate = req.body.endDate;

    return clients.create({
        name:name,
        contactName: contactName,
        email: email,
        type: type,
        country: country,
        startDate: startDate,
        endDate: endDate,
    }).then(function (clients) {
        if (clients) {
            res.send("Client  " + name + " was added successfully -> JSON: " + JSON.stringify(clients));
            console.log("Client " + username + " was added successfully -> JSON: " + JSON.stringify(clients));
        } else {
            res.status(400).send('Error in insert new record');
            console.log('Error in insert new record');
        }
    })
});



module.exports = router;