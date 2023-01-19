const express = require('express');
const { findByUsername } = require('../models/user.cjs');
const router = express.Router();

const User = require('../models/user.cjs');
const currentUserUsername = '';

// == /auth ==
router.get('/', (req, res) => {
	res.render('login');
});

// == /auth/login == //
router.post('/login', async (req, res) => {
	// users.push({username: req.body.username, password: req.body.password});
	// await new User('Luke', '222223').save();

	// TODO - Log user in
  currentUserUsername.username = req.body.username;
  console.log('currentUserUsername: ', currentUserUsername);
	res.redirect('/');
});

// == GET: /auth/signup == //
router.get('/signup', (req, res) => {
	console.log('get.signup() was called...');
	res.render('signup');
});

// == POST: /auth/signup == //
router.post('/signup', async (req, res) => {
	console.log('post.signup() was called...', req.body);
	try {
		const newUser = new User( req.body.username, req.body.email, req.body.password, true);
		await newUser.save();
    currentUserUsername.username = req.body.username;
    console.log('currentUserUsername: ', currentUserUsername);
		res.redirect('/auth');
	}catch (err) {
	  res.status(400).render('error', {error: err});
	}
});

// TODO - Store currentUserUsername in data file and add functionality to User class to read/write the currentUser each time that user logs in or out.
// == GET: /auth/logout == //
router.get('/logout', (req, res) => {
  console.log('get.logout() was called...', currentUserUsername);
  res.render('logout');
});

// == POST: /auth/logout == //
router.post('/logout', async(req, res) =>{
  console.log('post.logout() was called...');
  await User.logout(currentUserUsername);
  currentUserUsername.username = null;
  res.redirect('/');
});

module.exports = router;
