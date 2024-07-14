const express = require('express');
const router = express.Router();
const handler = require('../utils/asynchandler');
const ApiResponse = require('../utils/ApiResponse');
const ApiError = require('../utils/ApiError');

router.get('/items', handler(async (req, res) => {
    const Items = require('../models/food.items.model');
    const items = await Items.find();
    ApiResponse.ok(res, items);
}));

router.get('/items/:id', handler(async (req, res) => {
    const Items = require('../models/food.items.model');
    const item = await Items.findById(req.params.id);
    if(!item) throw new ApiError(404, 'Item not found');
    ApiResponse.ok(res, item);
}));

router.get('/restaurants', handler(async (req, res) => {
    const Restaurants = require('../models/restaurant.model');
    const restaurants = await Restaurants.find();
    ApiResponse.ok(res, restaurants);
}));

router.get('/restaurants/:id', handler(async (req, res) => {
    const Restaurants = require('../models/restaurant.model');
    const restaurant = await Restaurants.findById(req.params.id);
    if(!restaurant) throw new ApiError(404, 'Restaurant not found');
    ApiResponse.ok(res, restaurant);
}
));

router.get('/restaurants/:id/items', handler(async (req, res) => {
    const Items = require('../models/restaurant.model');
    const items = await Items.findById(req.params.id);
    ApiResponse.ok(res, items.foodItems);
}
));

module.exports = router;