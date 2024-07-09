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
module.exports = app;