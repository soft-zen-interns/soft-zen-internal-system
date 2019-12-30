const router = require('express').Router();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const mysql = require('mysql');
const Sequelize = require('sequelize');
const dao = require('../dao/auth')
const crypto = require('crypto')

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

const users = sequelize.define('users', {
    id: {
        primaryKey: true,
        type: Sequelize.INTEGER,
    },
    username: Sequelize.STRING,
    token: Sequelize.STRING
});

router.post('/up', (req,res,next) => {
    const secret = 'secretKey'
    let username = req.body.username
    let password = req.body.password

    return dao.getUsersByUsername(username)
        .then(users => {
            if(users.length !== 0){
                throw { status: 409, message: 'User already exists' }
            }
            let hashPassword = crypto.createHmac('sha256', secret)
                .update(password)
                .digest('hex')

            return dao.createUser(username, hashPassword)
                .then(users => {
                    let payload =
                        {
                            username: username,
                            password: hashPassword
                        }

                    if (users) {
                        let token = jwt.sign(payload, "secret_key", {algorithm: 'HS256'});

                        res.json({message: "New user was created successfully.",
                                    token: token})
                    } else {
                       throw {status: 404, message: "Something went wrong."}
                    }
                })
        }).catch(next)
})


// router.post('/up', (req,res) => {
//     console.log(req.body);
//     var username = req.body.username;
//     var password = req.body.password;
//     var payload = {
//         username: username,
//         password: password
//     };
//
//     connection.getConnection(function (err, connection) {
//         connection.query("Select (username) from users where username = '" + username + "'", function (err, result) {
//             if (err) {
//                 console.log("Database error");
//             } else if (result.toString() !== "") {
//                 console.log("-> " + username + " already exists.");
//                 res.status(400).send("-> " + username + " already exists.");
//             } else {
//                 if (password != null) {
//                     let token = jwt.sign(payload, "secret_key", {algorithm: 'HS256'});
//
//                     return users.create({
//                         username: username,
//                         token: token
//                     }).then(function (users) {
//                         if (users) {
//                             res.send("Account " + username + " was created successfully -> JSON: " + JSON.stringify(users));
//                             console.log("Account " + username + " was created successfully -> JSON: " + JSON.stringify(users));
//                         } else {
//                             res.status(400).send('Error in insert new record');
//                             console.log('Error in insert new record');
//                         }
//                     })
//                 }
//                 else {
//                     res.status(400).send('No password!');
//                     console.log('No password!');
//                 }
//             }
//         })
//     })
// });


router.get('/in', (req,res) => {
    var username = req.body.username;
    var password = req.body.password;

    connection.getConnection(function (err, connection) {
        connection.query("Select (token) from users where username = '" + username + "'", function (err, result) {
            if (err) {
                console.log("Database error");
            } else if (result.toString() === "") {
                console.log("-> " + username + " does not exists.");
                res.status(400).send("-> " + username + " does not exists.");
            } else {
                if (password != null) {
                    let token = result[0].token.toString();

                    jwt.verify(token,"secret_key",function(err,verifiedJwt){
                        if(err){
                            res.status(400).send("Token has expired, or something else went wrong");
                        }else{
                            if (verifiedJwt.password.toString() === password)
                            {
                                res.send(token);
                            }else{
                                res.status(400).send("Wrong password");
                            }
                        }
                    });
                } else {
                    res.status(400).send('No password!');
                    console.log('No password!');
                }
            }

        })
    })
});


module.exports = router;