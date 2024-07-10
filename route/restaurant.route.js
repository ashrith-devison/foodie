const router = require('express').Router();
const RestaurantModel = require('../models/restaurant.model');
const handler = require('../utils/asynchandler');
const ApiResponse = require('../utils/ApiResponse');
const admin = require('../middlewares/admin.middleware');

router.get(
  '/',
  handler(async (req, res) => {
    const restaurants = await RestaurantModel.find({});
    ApiResponse.send(res, 200, 'Restaurants fetched successfully', restaurants);
  })
);

router.post(
  '/',
  admin,
  handler(async (req, res) => {
    const { name, address, phone, tags, foodItems } = req.body;

    const restaurant = new RestaurantModel({
      name,
      address,
      phone,
      tags: tags.split ? tags.split(',') : tags,
      foodItems
    });

    await restaurant.save();

    res.send(restaurant);
  })
);

router.put(
  '/',
  admin,
  handler(async (req, res) => {
    const { id, name, address, phone, tags, foodItems } = req.body;

    await RestaurantModel.updateOne(
      { _id: id },
      {
        name,
        address,
        phone,
        tags: tags.split ? tags.split(',') : tags,
        foodItems
      }
    );

    res.send();
  })
);

router.delete(
  '/:restaurantId',
  admin,
  handler(async (req, res) => {
    const { restaurantId } = req.params;
    await RestaurantModel.deleteOne({ _id: restaurantId });
    res.send();
  })
);

router.get(
  '/tags',
  handler(async (req, res) => {
    const tags = await RestaurantModel.aggregate([
      {
        $unwind: '$tags',
      },
      {
        $group: {
          _id: '$tags',
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          name: '$_id',
          count: '$count',
        },
      },
    ]).sort({ count: -1 });

    const all = {
      name: 'All',
      count: await RestaurantModel.countDocuments(),
    };

    tags.unshift(all);

    res.send(tags);
  })
);

router.get(
  '/search/:searchTerm',
  handler(async (req, res) => {
    const { searchTerm } = req.params;
    const searchRegex = new RegExp(searchTerm, 'i');

    const restaurants = await RestaurantModel.find({ name: { $regex: searchRegex } });
    res.send(restaurants);
  })
);

router.get(
  '/tag/:tag',
  handler(async (req, res) => {
    const { tag } = req.params;
    const restaurants = await RestaurantModel.find({ tags: tag });
    res.send(restaurants);
  })
);

router.get(
  '/:restaurantId',
  handler(async (req, res) => {
    const { restaurantId } = req.params;
    const restaurant = await RestaurantModel.findById(restaurantId).populate('foodItems');
    res.send(restaurant);
  })
);

module.exports = router;
