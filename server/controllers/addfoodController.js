const Meal = require('../models/meal.js');
const Foodtype = require('../models/foodtype.js');
const User = require('../models/user.js');
const mongoose = require('mongoose');
const logger = require('tracer').console();

exports.postAddfood = (req, res) => {
  let user = new User();
  Object.assign(user, res.locals.user);

  const food = new Foodtype({
    _id: new mongoose.Types.ObjectId(),
    userID: user._id,
    brand: req.body.brand,
    volume: req.body.volume,
    packageDailyEquivalent: req.body.packageDailyEquivalent,
  });
  user.foodtypes.push(food);
  user.save((error) => {
    if (error) logger.log(error);
  });
  food.save((err) => {
    if (err) {
      logger.log(err  );
      res.send(err);
    } else {
      res.json({ message: 'New food added', food });
    }
  });
};

exports.deleteFood = (req, res) => {
  let user = new User();
  Object.assign(user, res.locals.user);
  Foodtype.findByIdAndRemove(req.body._id, (err1, food) => {
    if (err1) logger.log(err1);
    // User.findById(req.session.passport.user, (err2, user) => {
      // if (err2) logger.log(err2);
      const filteredFoodTypes = user.foodtypes.filter(foodtype => foodtype._id !== req.body._id);
      user.foodtypes = filteredFoodTypes;
      user.save((err3) => {
        if (err3) logger.log(err3);
        res.json({ message: `meal id# ${food._id} deleted`, foodId: food._id });
      });
    });
  // });
};
