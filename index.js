require('dotenv').config();
const express = require('express');
const app = express();
require('./server/models').connect(process.env.DATABASE);
const path = require('path');
const bodyParser = require('body-parser');
const passport = require('passport');
const helmet = require('helmet');
const compression = require('compression')
const localSignupStrategy = require('./server/passport/local-signup');
const localLoginStrategy = require('./server/passport/local-login');
const authRoutes = require('./server/routes/auth');
const apiRoutes = require('./server/routes/api');
const defaultRoute = require('./server/routes/defaultRoute');


app.use(helmet());
app.use(compression());
app.use(express.static(path.join(__dirname, 'server/static')));
app.use(express.static(path.join(__dirname, 'client/dist')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//passport
app.use(passport.initialize());
passport.use('local-signup', localSignupStrategy);
passport.use('local-login', localLoginStrategy);

// pass the authorization checker middleware
const authCheckMiddleware = require('./server/middleware/auth-check');
app.use('/api', authCheckMiddleware);

// app.get('*.js', function (req, res, next) {
//   req.url = req.url + '.gz';
//   res.set('Content-Encoding', 'gzip');
//   res.set('Content-Type', 'text/javascript');
//   next();
// });

// routes
app.use('/auth', authRoutes);
app.use('/api', apiRoutes);
app.use('*', defaultRoute); 

app.listen(process.env.PORT, () => {
  console.log('Server is listening');
});
