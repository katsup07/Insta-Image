const Picture = require('../models/picture.cjs');
const express = require('express');
const router = express.Router();

const pictures = [];
const comments = [];

// == /admin ==
router.get('/', (req, res) => {
  res.render('admin');
});

// == /admin/add-picture ==
router.post('/add-picture', async(req, res) => {
  try{
  const result = await new Picture(req.body.title, req.body.url, 'some_user').save();
  console.log(result);
  res.redirect('/');
  } catch(err){
    console.log('err: ', err);
    return res.status(400).render('error', {error: err});
  }
});

// == /admin/add-comment ==
router.post('/add-comment', async(req, res) => {
  console.log('adding comment...', req.body);
  // comments.push({id: req.body.pictureId, comment: req.body.comment});
  await Picture.addComment(req.body.title, req.body.comment);
  res.redirect('/');
});

module.exports = { router, pictures, comments };