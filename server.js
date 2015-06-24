var express = require("express"),
	path = require("path"),
	bodyParser = require("body-parser"),
	mongoose = require("mongoose"),
	app = express();

mongoose.connect("mongodb://localhost/cars_mongoose");

var CarsSchema = new mongoose.Schema({
	make: String,
	model: String,
	year: String
});

// Validation 
CarsSchema.path("make").required(true, "Make cannot be blank");
CarsSchema.path("model").required(true, "Model cannot be blank");
CarsSchema.path("year").required(true, "Year cannot be blank");

var Cars = mongoose.model("Cars", CarsSchema);

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "./client/static")));

app.set("views", path.join(__dirname, "./client/views"));
app.set("view engine", "ejs");

app.get("/", function(req, res){
	res.render("index");
});

// Find all cars in DB:
app.get("/cars", function(req, res){
	Cars.find({}, function(err, cars){
		if(err){
			console.error(err);
		} else {
			res.render("cars", {cars: cars});
		}
	});
});

// Find ONE car in DB:
app.get("/cars/:id", function(req, res){
	Cars.find({_id: req.params.id}, function(err, cars){
		if(err){
			console.log("ERR ERR while trying to show car!");
		}
		res.render("showCar", {cars: cars});
	});
});

// Add new car to DB:
app.post("/addCar", function(req, res){
	console.log("POST DATA: ", req.body);
	var addCar = new Cars({
		make: req.body.make,
		model: req.body.model,
		year: req.body.year
	});
	addCar.save(function(err){
		if(err){
			console.log("DANGER Will Robinson! Err while saving new car");
			res.render("index", {
				title: "DANGER Will Robinson! Err while saving new car",
				errors: addCar.errors
			});
		} else {
			console.log("Success adding a new car!");
			Cars.find({}, function(err, cars){
				if(err){
					console.log(err);
				}
				console.log(cars);
				res.redirect("/cars");
			});
		}
	});
});

// Update car in DB:
app.get("/cars/:id/edit", function(req, res){
	Cars.find({_id: req.params.id}, function(err, cars){
		if(err){
			console.log("ERR ERR while trying to edit car!");
		}
		res.render("editCar", {cars: cars});
	});
});
app.post("/cars/:id", function(req, res){
	console.log("POST DATA:", req.body);
	Cars.update({_id: req.params.id}, { $set: { make: req.body.make, model: req.body.model, year: req.body.year }}, function(err, cars){
		if(err){
			console.log("ERR ERR while trying to update car!");
		} else {
			res.redirect("/cars");
		}
	});
});

// Delete car in DB:
app.post("/cars/:id/delete", function(req, res){
	Cars.findOneAndRemove({_id: req.params.id}, function(err, cars){
		if(err){
			console.log("ERR ERR while trying to delete car!");
		}
		res.redirect("/cars");
	});
});

app.listen(6789, function(){
	console.log("Listening on port 6789");
});