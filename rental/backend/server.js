var express = require('express');
var server = express();
var routes = require('./routes/routes');
var mongoose = require('mongoose');
const cors = require('cors');
mongoose.set('strictQuery', false);
server.use(express.json());
async function connectToDatabase() {
    console.log("Attempting to connect to the database...");

    try {
        await mongoose.connect('mongodb+srv://kmate9806:xR43mMate@atlascluster.yihskuy.mongodb.net/webtech');
        console.log("started db");
    } catch (error) {
        console.log("error db", error);
    }

    console.log("Connection attempt finished.");
}

connectToDatabase();

server.use(express.json());
server.use(cors());
server.use(routes);

server.listen(8000, function check(error) {
    if (error) {
        console.log("error server");
    } else {
        console.log("started server");
    }
});
