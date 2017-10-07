const express = require('express');
const accountController = require('../controllers/accountController.js');
const trackController = require('../controllers/trackController.js');
const statsController = require('../controllers/statsController.js');
const mealsController = require('../controllers/mealsController.js');
const addfoodController = require('../controllers/addfoodController.js');

const router = new express.Router();

router.get('/dashboard', (req, res) => {
  res.status(200).json({
    message: "You're authorized to see this secret message."
  });
});
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
