const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const FoodtypeSchema = new Schema({
  _id: Schema.Types.ObjectId,
  userID: String,
  brand: String,
  volume: Number,
  packageDailyEquivalent: Number,
});

module.exports = mongoose.model('Foodtype', FoodtypeSchema);
