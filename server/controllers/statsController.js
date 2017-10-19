const User = require('../models/user.js');
const Meal = require('../models/meal.js');
const logger = require('tracer').console();
const ObjectId = require('mongodb').ObjectID;

exports.getStats = (req, res) => {
  let user = new User();
  Object.assign(user, res.locals.user);
  
  Meal.aggregate([
    {
      $match: {
        userID: ObjectId(user._id).toString(),
      },
    },
    {
      $project: {
        dayOfYear: { $substr: ['$timestampDateFormat', 0, 10] },
        percentDailyValue: true,
      },
    },
    {
      $group: {
        _id: '$dayOfYear',
        percentDailyValue: { $sum: '$percentDailyValue' },
      },
    },
    {
      $sort: {
        _id: 1,
      },
    },
  ], (error, meals) => {
    if (error) logger.log(error)
    else {
      res.json(meals);
    }
  });
};
