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

router.get('/', (req,res) => {
    connection.getConnection(function (err, connection) {
        connection.query("SELECT * FROM clients ORDER BY id ASC", function (err, result) {
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

router.get('/names', (req,res) => {
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

router.post('/create', (req,res) => {
    let name = req.body.name;
    let contactName = req.body.contactName;
    let email = req.body.email;
    let type = req.body.type;
    let country = req.body.country;
    let startDate = req.body.startDate;
    let endDate = req.body.endDate;

    connection.getConnection(function (err, connection) {
        connection.query("Select (name) from clients where name = '" + name + "'", function (err, result) {
            if (err) {
                console.log("Database error");
            } else if (result.toString() !== "") {
                console.log("-> Client with name \"" + name + "\" already exists.");
                res.status(400).send("-> Client with name \"" + name + "\" already exists.");
            } else {
                return clients.create({
                    name: name,
                    contactName: contactName,
                    email: email,
                    type: type,
                    country: country,
                    startDate: startDate,
                    endDate: endDate,
                }).then(function (clients) {
                    if (clients) {
                        res.send("-> Client with name \"" + name + "\" was added successfully -> JSON: " + JSON.stringify(clients));
                        console.log("-> Client with name \"" + name + "\" was added successfully -> JSON: " + JSON.stringify(clients));
                    } else {
                        res.status(400).send('Error in insert new record');
                        console.log('Error in insert new record');
                    }
                })
            }
        })
    })
});

router.put('/edit/:clientId', function (req, res, next) {
    let name = req.body.name;

    connection.getConnection(function (err, connection) {
        connection.query("Select * from clients where name = '" + name + "'", function (err, result) {
            if (err) {
                console.log("Database error");
            } else if (result.toString() !== "" && result[0]['id'].toString() !== req.params.clientId.toString()) {
                console.log("-> Client with name \"" + name + "\" already exists.");
                res.status(400).send("-> Client with name \"" + name + "\" already exists.");
            } else {
                clients.update(
                    {
                        name: req.body.name,
                        contactName: req.body.contactName,
                        email: req.body.email,
                        type: req.body.type,
                        country: req.body.country,
                        startDate: req.body.startDate,
                        endDate: req.body.endDate
                    },
                    {where: {id: req.params.clientId}}
                )
                    .then(function (rowsUpdated) {
                        if (rowsUpdated.toString() === "0") {
                            console.log("-> Client with id " + req.params.clientId + " does not exist.");
                            res.status(400).send("-> Client with id " + req.params.clientId + " does not exist.");
                        } else {
                            connection.query("Select * from clients where id = '" + req.params.clientId + "'", function (err, result) {
                                res.send("-> " + rowsUpdated + " row updated. Updated client: " + JSON.stringify(result));
                                console.log("-> " + rowsUpdated + " row updated. Updated client: " + JSON.stringify(result));
                            })
                        }
                    })
                    .catch(next)
            }
        })
    })
});

router.delete('/delete/:clientId', function (req, res, next) {
    connection.getConnection(function (err, connection)
    {
        connection.query("Select * from clients where id = '" + req.params.clientId + "'", function (err, result) {
            if (err) {
                console.log("Database error");
            } else if (result.toString() === "") {
                console.log("-> Client with id " + req.params.clientId + " does not exist.");
                res.status(400).send("-> Client with id " + req.params.clientId + " does not exist.");
            } else {
                clients.destroy({
                    where: {
                        id: req.params.clientId
                    }
                });
                res.send("-> Successfully deleted client with id " + req.params.clientId);
                console.log("-> Successfully deleted client with id " + req.params.clientId);
            }
        })
    })
});



module.exports = router;