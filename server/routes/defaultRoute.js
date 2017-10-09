const express = require('express');
const router = new express.Router();
const path = require('path');

router.get('*', (req, res) => {
  console.log(__dirname);
  res.sendFile(path.resolve(__dirname, '../static/index.html'));
});
// router.get('*', (req, res) => {
//   console.log(__dirname);
//   res.sendFile(path.resolve(__dirname, 'server/static', 'index.html'));
// });

module.exports = router;
