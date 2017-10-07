require('dotenv').config();
const jwt = require('jsonwebtoken');
const User = require('mongoose').model('User');
const logger = require('tracer').console();

/**
 *  The Auth Checker middleware function.
 */
module.exports = (req, res, next) => {
  // logger.log(req.headers.authorization);
  if (!req.headers.authorization) {
    return res.status(401).end();
  }

  // get the last part from a authorization header string like "bearer token-value"
  const token = req.headers.authorization.split(' ')[1];

  // decode the token using a secret key-phrase
  return jwt.verify(token, process.env.JWTSECRET, (err, decoded) => {
    // the 401 code is for unauthorized status
    if (err) { return res.status(401).end(); }

    const userId = decoded.sub;

    // check if a user exists
  User.findById({ _id: userId })
    .populate('foodtypes')
    .exec((err, user) => {    
    // return User.findById(userId, (userErr, user) => {
      if (err || !user) {
        logger.log(err);
        return res.status(401).end();
      }
      res.locals.user = user;
      return next();
    });
  });
};
