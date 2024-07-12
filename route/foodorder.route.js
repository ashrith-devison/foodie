const router = require('express').Router();
const FoodOrderModel = require('../models/foodorder.model');
const handler = require('../utils/asynchandler');
const ApiResponse = require('../utils/ApiResponse');
const admin = require('../middlewares/admin.middleware');
const FoodItems = require('../models/food.model');

router.get(
  '/',
  handler(async (req, res) => {
    const orders = await FoodOrderModel.find({}).populate('items.foodItem');
    ApiResponse.send(res, 200, 'Orders fetched successfully', orders);
  })
);

router.get(
  '/:orderId',
  handler(async (req, res) => {
    const { orderId } = req.params;
    const order = await FoodOrderModel.findById(orderId).populate('items.foodItem');
    if (!order) {
      return ApiResponse.send(res, 404, 'Order not found');
    }
    ApiResponse.send(res, 200, 'Order fetched successfully', order);
  })
);

router.post(
  '/',
  handler(async (req, res) => {
    const { customerName, customerPhone, customerAddress, items } = req.body;

    let totalPrice = 0;
    for (const item of items) {
      const foodItem = await FoodItems.findById(item.foodItem);
      console.log(foodItem);
      if (foodItem) {
        totalPrice += foodItem.price * item.quantity;
      }
    }

    const order = new FoodOrderModel({
      customerName,
      customerPhone,
      customerAddress,
      items,
      totalPrice,
    });

    await order.save();
    ApiResponse.send(res, 201, 'Order created successfully', order);
  })
);

router.put(
  '/:orderId',
  admin,
  handler(async (req, res) => {
    const { orderId } = req.params;
    const { customerName, customerPhone, customerAddress, items, status } = req.body;

    let totalPrice = 0;
    for (const item of items) {
      const foodItem = await FoodOrderModel.findById(item.foodItem);
      if (foodItem) {
        totalPrice += foodItem.price * item.quantity;
      }
    }

    await FoodOrderModel.updateOne(
      { _id: orderId },
      {
        customerName,
        customerPhone,
        customerAddress,
        items,
        totalPrice,
        status,
      }
    );

    ApiResponse.send(res, 200, 'Order updated successfully');
  })
);

router.delete(
  '/:orderId',
  admin,
  handler(async (req, res) => {
    const { orderId } = req.params;
    await FoodOrderModel.deleteOne({ _id: orderId });
    ApiResponse.send(res, 200, 'Order deleted successfully');
  })
);

module.exports = router;
