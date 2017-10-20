const Meal = require('../models/meal.js');
const User = require('../models/user.js');
const logger = require('tracer').console();

exports.getTrack = (req, res) => {
  res.json(res.locals.user.foodtypes);
};

exports.postTrack = (req, res) => {
  let user = new User();
  Object.assign(user, res.locals.user);
  const utcDateTime = new Date(req.body.localDateTime);
  utcDateTime.setHours(utcDateTime.getHours() + req.body.timezoneoffset);
  const meal = new Meal({
    brand: req.body.brand,
    packageportion: req.body.amount,
    percentDailyValue: req.body.percentDailyValue,
    openednewpackage: req.body.openednewpackage,
    userID: user._id,
    utcDateTime, utcDateTime,
    localDateTime: req.body.localDateTime,
    timezoneoffset: req.body.timezoneoffset,
  });
  meal.save((error) => {
    if (error) {
      logger.log(error);
      res.status(500).send('Something broke!');
    } else {
      // res.render('track', { isAuthenticated: true, user, title: 'Pet Meal Tracker' });
      res.json({ message: 'Meal added', meal });
    }
  });
};
