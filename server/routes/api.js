const express = require('express');
const User = require('../models/user.js')
const dashboardController = require('../controllers/dashboardController.js');
const accountController = require('../controllers/accountController.js');
const trackController = require('../controllers/trackController.js');
const statsController = require('../controllers/statsController.js');
const mealsController = require('../controllers/mealsController.js');
const addfoodController = require('../controllers/addfoodController.js');

const router = new express.Router();

router.route('/dashboard')
  .get(dashboardController.getDashboard);
router.route('/account')
  .get(accountController.getAccount);
router.route('/track')
  .get(trackController.getTrack)
  .post(trackController.postTrack);
router.route('/meals')
  .get(mealsController.getMeals)
  .delete(mealsController.deleteMeal);
router.route('/stats')
  .get(statsController.getStats);
router.route('/addfood')
  .post(addfoodController.postAddfood)
  .delete(addfoodController.deleteFood);

module.exports = router;
