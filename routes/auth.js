var express = require('express');
var router = express.Router();
var passport = require('passport');
var stormpath = require('stormpath');

// Render login page
router.get('/login', function(req, res) {
    res.render('login', {title: 'Login', error: req.flash('error')[0]});
});


// Authenticate a user
router.post(
	'/login',
	passport.authenticate(
		'stormpath',
		{
			successRedirect: '/dashboard',
			failureRedirect: '/login',
			failureFlash: 'Invalid email or password.',
		}
	)
);

router.post(
	'/',
	passport.authenticate(
		'stormpath',
		{
			successRedirect: '/dashboard',
			failureRedirect: '/login',
			failureFlash: 'Invalid email or password.',
		}
	)
);

module.exports = router;

