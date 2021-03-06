const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MealSchema = new Schema({
  userID: String,
  brand: String,
  openednewpackage: Boolean,
  packageportion: Number,
  percentDailyValue: Number,
  utcDateTime: Date,
  localDateTime: String,
  timezoneoffset: Number,
});

module.exports = mongoose.model('Meal', MealSchema);
