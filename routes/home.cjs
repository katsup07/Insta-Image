const express = require('express');
const router = express.Router();

const { pictures, comments } = require('./admin.cjs')

// == / ==
router.get('/', (req, res) => {
  res.render('pictures', {data: { pictures, comments} });
});

module.exports = router;