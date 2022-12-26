const path = require('path');
const express = require('express');
const router = express.Router();

const { pictures, comments } = require('./admin.cjs')

// == /pictures ==
router.get('/', (req, res) => {
  console.log(pictures);
  res.render('pictures',{ data: { pictures, comments}})
});


module.exports = router;