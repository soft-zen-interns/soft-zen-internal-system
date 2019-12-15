const app = (require('./getApp'))()

const PORT = process.env.PORT || 5000;

var server = app.listen(PORT, '0.0.0.0', function () {
    console.log("server started on port " + PORT + "...");
});
