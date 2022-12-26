const express = require('express');
const router = express.Router();

const pictures = [];
const comments = [];

// == /admin ==
router.get('/', (req, res) => {
  res.render('admin');
});

// == /admin/add-picture ==
router.post('/add-picture', (req, res) => {
  console.log(req.body);
  pictures.push({title: req.body.title, url: req.body.url});
  console.log('pictures: ', pictures);
  res.redirect('/');
});

// == /admin/add-comment ==
router.post('/add-comment', (req, res) => {
  console.log('adding comment...', req.body);
  // console.log('comments: ', comments);
  comments.push({id: req.body.pictureId, comment: req.body.comment});
  res.redirect('/');
});

module.exports = { router, pictures, comments };