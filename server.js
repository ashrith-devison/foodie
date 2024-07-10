const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Hello World');
    }
);

app.use('/api/food/', require('./route/food.router'));
app.use('/api/user/', require('./route/user.route'));
app.use('/api/restaurant/', require('./route/restaurant.route'));
app.use('/api/foodorder/',require('./route/foodorder.route'));
module.exports = app;