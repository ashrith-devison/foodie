const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended : true}));

app.get('/', (req, res) => {
    res.send('Hello World');
    }
);

app.use('/api/auth/', require('./route/auth.route'));
app.use('/api/food/', require('./route/food.items.route'));
module.exports = app;