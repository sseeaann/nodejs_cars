var carsController = require('../controllers/cars_controller.js');

module.exports = function(app) {
	app.get("/", function(req, res){
		res.render("index");
	});

	// Find all cars in DB:
	app.get("/cars", function(req, res){
		carsController.show(req, res);
	});

	// Find ONE car in DB:
	app.get("/cars/:id", function(req, res){
		carsController.showOne(req, res);
	});

	// Add new car to DB:
	app.post("/addCar", function(req, res){
		carsController.addCar(req, res);
	});

	// Update car in DB:
	app.get("/cars/:id/edit", function(req, res){
		carsController.editCar(req, res);
	});
	app.post("/cars/:id", function(req, res){
		carsController.updateCar(req, res);
	});

	// Delete car in DB:
	app.post("/cars/:id/delete", function(req, res){
		carsController.deleteCar(req, res);
	});
};