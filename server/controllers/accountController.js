const User = require('../models/user.js');
const logger = require('tracer').console();

exports.getAccount = (req, res) => {
  let user = new User();
  Object.assign(user, res.locals.user);
  console.log(user);
  res.json({user_email: user.email, username: user.name});
};
