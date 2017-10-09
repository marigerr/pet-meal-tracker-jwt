require('dotenv').config();
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const passport = require('passport');
const helmet = require('helmet')

// connect to the database and load models
require('./server/models').connect(process.env.DATABASE);

const app = express();
// tell the app to look for static files in these directories
app.use(helmet());
app.use(express.static(path.join(__dirname, 'server/static')));
app.use(express.static(path.join(__dirname, 'client/dist/js')));
// app.use(express.static('./client/'));
// tell the app to parse HTTP body messages
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// pass the passport middleware
app.use(passport.initialize());

// load passport strategies
const localSignupStrategy = require('./server/passport/local-signup');
const localLoginStrategy = require('./server/passport/local-login');
passport.use('local-signup', localSignupStrategy);
passport.use('local-login', localLoginStrategy);

// pass the authorization checker middleware
const authCheckMiddleware = require('./server/middleware/auth-check');
app.use('/api', authCheckMiddleware);

// routes
const authRoutes = require('./server/routes/auth');
const apiRoutes = require('./server/routes/api');
const defaultRoute = require('./server/routes/defaultRoute');
app.use('/auth', authRoutes);
app.use('/api', apiRoutes);
app.use('*', defaultRoute); 

// start the server
app.listen(process.env.PORT, () => {
  console.log('Server is listening');
});
