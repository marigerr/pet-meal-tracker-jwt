const Meal = require('../models/meal.js');
const User = require('../models/user.js');
const logger = require('tracer').console();

exports.getDashboard = (req, res) => {
  res.json({message: "this is dashboard data"});
};


