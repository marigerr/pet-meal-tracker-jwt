const Meal = require('../models/meal.js');
const User = require('../models/user.js');
const logger = require('tracer').console();

exports.getTrack = (req, res) => {
  res.json(res.locals.user.foodtypes);
};

exports.postTrack = (req, res) => {
  let user = new User();
  Object.assign(user, res.locals.user);
  const timestampDateFormat = new Date(req.body.timestampString);
  timestampDateFormat.setHours(timestampDateFormat.getHours() + req.body.timezoneoffset);
  const timestampFormattedString = timestampDateFormat.toLocaleString([], { month: '2-digit', day: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit' })
  const meal = new Meal({
    brand: req.body.brand,
    packageportion: req.body.amount,
    percentDailyValue: req.body.percentDailyValue,
    openednewpackage: req.body.openednewpackage,
    userID: user._id,
    timestampDateFormat, timestampDateFormat,
    timestampString: req.body.timestampString,
    timestampFormattedString: timestampFormattedString,
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
