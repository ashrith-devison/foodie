const mongoose = require('mongoose');

function connectDB() {
    return mongoose.connect("mongodb://127.0.0.1:27017/foodie")
    .then(() => {
        console.log('Connected to the database!');
    })
    .catch((err) => {
        console.log('Error connecting to the database', err);
    }
    );
}

module.exports = connectDB;