const express = require('express');
const app = express();
const sign = require('./routes/sign.js');

app.use('/sign',sign);

var server = app.listen(8000, '0.0.0.0', function() {
    console.log("server started on port 8000...");
});
