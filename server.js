var express = require("express"),
	path = require("path"),
	bodyParser = require("body-parser"),
	app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "./client/static")));

app.set("views", path.join(__dirname, "./client/views"));
app.set("view engine", "ejs");

require('./server/config/mongoose.js');
require('./server/config/routes.js')(app);

app.listen(6789, function(){
	console.log("Listening on port 6789");
});