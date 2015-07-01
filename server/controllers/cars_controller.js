var mongoose = require("mongoose"),
	carsModel = mongoose.model("cars");

module.exports = (function(app){
	return {
		show: function(req, res){
			carsModel.find({}, function(err, cars){
				if(err){
					console.error(err);
				} else {
					res.render("cars", {cars: cars});
				}
			});
		},
		showOne: function(req, res){
			carsModel.find({_id: req.params.id}, function(err, cars){
				if(err){
					console.log("ERR ERR while trying to show car!");
				}
				res.render("showCar", {cars: cars});
			});
		},
		addCar: function(req, res){
			console.log("POST DATA: ", req.body);
			var addCar = new carsModel({
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
					carsModel.find({}, function(err, cars){
						if(err){
							console.log(err);
						}
						console.log(cars);
						res.redirect("/cars");
					});
				}
			});
		},
		editCar: function(req, res){
			carsModel.find({_id: req.params.id}, function(err, cars){
				if(err){
					console.log("ERR ERR while trying to edit car!");
				}
				res.render("editCar", {cars: cars});
			});
		},
		updateCar: function(req, res){
			console.log("POST DATA:", req.body);
			carsModel.update({_id: req.params.id}, { $set: { make: req.body.make, model: req.body.model, year: req.body.year }}, function(err, cars){
				if(err){
					console.log("ERR ERR while trying to update car!");
				} else {
					res.redirect("/cars");
				}
			});
		},
		deleteCar: function(req, res){
			carsModel.findOneAndRemove({_id: req.params.id}, function(err, cars){
				if(err){
					console.log("ERR ERR while trying to delete car!");
				}
				res.redirect("/cars");
			});
		}
	}
})();