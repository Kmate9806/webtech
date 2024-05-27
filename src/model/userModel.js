var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var userSchema = new Schema({
    id:{
        type: Number,
        required: true
    },
    firstName:{
        type: String,
        required: true
    },
   lastName:{
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    tel:{
        type: Number,
        required: true
    },
    email:{
        type: String,
        required: true
    }
   

});

