const router = require('express').Router();
const bodyParser = require('body-parser');
const mysql = require('mysql');
const Sequelize = require('sequelize');
const dao = require('../dao/clients')

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

router.get('/', (req, res, next) => {
    return dao.getClients()
        .then(clients => {
            return res.json(clients)
        })
        .catch(next)
});

router.get('/names', (req, res) => {
    connection.getConnection(function (err, connection) {
        connection.query("SELECT (name) FROM clients ORDER BY id ASC", function (err, result) {
            if (err) {
                res.status(400).send(err.message);
                console.log("Database error!");
            }
            else {
                console.log(result);
                res.send(result);
            }
        });
    });
});

router.post('/', (req, res, next) => {
    let name = req.body.name;
    let contactName = req.body.contactName;
    let email = req.body.email;
    let type = req.body.type;
    let country = req.body.country;
    let startDate = req.body.startDate;
    let endDate = req.body.endDate;
    return dao.getClientByName(name)
        .then(clients => {
            if (clients.length > 0) {
                throw { status: 409, message: 'Client already exists' }
            }
            return dao.createClient(name, contactName, email, type, country, startDate, endDate)
        })
        .then((client) => {
            if (!client) {
        throw { status: 400, message: 'Error in insert new record' }
    }
    return res.json(client);
})
        .catch(next)

});

router.put('/:clientId', function (req, res, next) {
    let id = req.params.clientId
    let name = req.body.name
    let contactName = req.body.contactName
    let email = req.body.email
    let type = req.body.type
    let country = req.body.country
    let startDate = req.body.startDate
    let endDate = req.body.endDate


    return dao.getClientById(id)
        .then((client) => {
            if (client.length === 0) {
                throw {status: 409, message: 'Client with id ' + id + ' does not exist.'}
            }
            return dao.updateClient(id,name,contactName,email,type,country,startDate,endDate)
        })
        .then((rowsUpdated) => {
            if (rowsUpdated){
                res.json({rowsUpdated: rowsUpdated, message: rowsUpdated + ' row updated.'})
            }
        }).catch(next)
    // return dao.getClientByName(name)
    //     .then(clients => {
    //         if (clients.toString() !== "") {
    //             if (clients[0]['id'].toString() !== req.params.clientId.toString()) {
    //                 throw {status: 409, message: 'Client with name ' + name + ' already exists'}
    //             }
    //         }
    //         return dao.updateClient(req.params.clientId, name, contactName, email, type, country, startDate, endDate)
    //     })
    //     .then( rowsUpdated => {
    //         if (rowsUpdated) {
    //             res.json(rowsUpdated);
    //         } else {
    //             throw {status: 409, message: 'Client with id "' + req.params.clientId + '" does not exist.'}
    //         }
    //     }).catch(next)
});


router.delete('/:clientId', function (req, res, next) {

    return dao.getClientById(req.params.clientId)
        .then(client => {
            if(client.length === 0) {
                throw {status: 409, message: "Client with id " + req.params.clientId + " does not exist."}
            }else{
                return dao.deleteClient(req.params.clientId);
            }
        }).then( () => {
            res.json({message: "Successfully deleted client with id " + req.params.clientId});
        }).catch(next)
});



module.exports = router;