const express = require('express');
const router = express.Router();
const Picture = require('../models/picture.cjs')

const { comments } = require('./admin.cjs')

// == / ==
router.get('/', async (req, res) => {
  const pictures = await Picture.fetchAllPictures();
  console.log("pictures: ", pictures);
  res.render('pictures',{ data: { pictures, comments}})
});

module.exports = router;