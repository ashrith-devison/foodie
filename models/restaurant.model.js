const { model, Schema } = require('mongoose');

const RestaurantSchema = new Schema(
  {
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    tags: { 
        type: [String] 
    },
    foodItems: [{ 
        type: Schema.Types.ObjectId, 
        ref: 'food-items' 
    }],
  },
  {
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
    timestamps: true,
  }
);

module.exports = model('restaurant', RestaurantSchema);
