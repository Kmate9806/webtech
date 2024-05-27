const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors());

async function connectToDatabase() {
    try {
        await mongoose.connect('mongodb+srv://kmate9806:xR43mMate@atlascluster.yihskuy.mongodb.net/webtech', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('MongoDB connection successful');
    } catch (error) {
        console.error('MongoDB connection error:', error);
    }
}


connectToDatabase();

// Define a schema
const rentalSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    // Add other fields as necessary
});

const Rental = mongoose.model('Rental', rentalSchema);

// Define routes
app.get('/api/rentals', async (req, res) => {
    try {
        const rentals = await Rental.find();
        res.json(rentals);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.post('/api/rentals', async (req, res) => {
    const rental = new Rental(req.body);
    try {
        const newRental = await rental.save();
        res.status(201).json(newRental);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
