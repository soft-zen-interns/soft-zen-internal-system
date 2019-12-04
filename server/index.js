const express = require('express');
const app = express();
const sign = require('./routes/sign.js');
const clients = require('./routes/clients.js');

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use('/sign',sign);
app.use('/clients',clients);


var server = app.listen(8000, '0.0.0.0', function() {
    console.log("server started on port 8000...");
});
