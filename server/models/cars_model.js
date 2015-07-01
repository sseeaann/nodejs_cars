// require mongoose and connect it to the DB
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;
// establish a schema
var CarsSchema = new mongoose.Schema({
	make: String,
	model: String,
	year: String
});
// connect the collection and model schema
mongoose.model('cars', CarsSchema);

// Validation 
CarsSchema.path("make").required(true, "Make cannot be blank");
CarsSchema.path("model").required(true, "Model cannot be blank");
CarsSchema.path("year").required(true, "Year cannot be blank");