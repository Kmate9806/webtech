
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var vehicleSchema = new Schema({
  
    brand: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    plate: {
        type: String,
        required: true
    },
    odometer: {
        type: String,
        required: true
    },
    basePrice: {
        type: String,
        required: true
    },
    kmCost: {
        type:String,
        required: true
    },
    imgUrl: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    }
    
   

});

module.exports = mongoose.model('Vehicle', vehicleSchema, 'vehicle');
