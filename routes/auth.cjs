const express = require('express');
const router = express.Router();

const User = require('../models/user.cjs');

const users = []; // {username: , password: }

// == /auth ==
router.get('/', (req, res) => {
res.render('login')
});

router.post('/login', async (req, res) => {
  // console.log(req.body);
  // users.push({username: req.body.username, password: req.body.password});
  // console.log(users);
  await new User('John', '222223').save();
  res.redirect('/');
});

module.exports = router;

