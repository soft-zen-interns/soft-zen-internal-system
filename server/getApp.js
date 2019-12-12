const express = require('express');
const app = express();
const sign = require('./routes/sign.js');
const clients = require('./routes/clients.js');

const getApp = () => {
    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });
    app.use('/sign',sign);
    app.use('/clients',clients);

    app.use((err, req, res, next) => {
        if (err.status) {
          if (err.message) {
            res.status(err.status).send({ message: err.message });
          } else {
            res.status(err.status).send(err.body);
          }
        } else {
          console.log(err);
          res.status(422).send({ error: err.message });
        }
      });
    return app
}

module.exports = getApp