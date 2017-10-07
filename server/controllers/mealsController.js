const User = require('../models/user.js');
const Meal = require('../models/meal.js');
const logger = require('tracer').console();

exports.getMeals = (req, res) => {
  let user = new User();
  Object.assign(user, res.locals.user);
  Meal.find({
    userID: user._id,
  })
    .sort({ timestamp: 'desc' })
    .exec((error, meals) => {
      // res.render('stats', { isAuthenticated: true, title: 'Tracker-Stats', meals });
      logger.log(meals);
      res.json(meals);
    });
};

exports.deleteMeal = (req, res) => {
  logger.log(req.body);

  Meal.findByIdAndRemove(req.body._id, (err, meal) => {
    if (err) {
      logger.log(err);
    } else {
      res.json({ message: `meal id# ${meal._id} deleted`, mealId: meal._id });
    }
  });
};
