const express = require('express');
const router = new express.Router();
const path = require('path');

router.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../static', 'index.html'));
});

module.exports = router;
