var express = require('express');
var passport = require('passport');
var User = require('../models/user').getUserModel();
var router = express.Router();

function registerUser (req, res, next) {
  User.register(new User({username: req.body.username}), req.body.password, function (err) {
    if (err) { return res.render('register', {title: 'Register', error: 'Username already taken'}); }
    next();
  });
}

router.get('/', function(req, res, next) {
  res.render('home', {title: 'Home', user: req.user});
});

router.get('/login', function(req, res) {
  res.render('login', {title: 'Login', user: req.user, error: req.query.error});
});

router.get('/register', function(req, res) {
  res.render('register', {title: 'Register', user: req.user});
});

router.post('/register', registerUser, passport.authenticate('local', {
  successRedirect: '/secret'
}));

router.post('/login', passport.authenticate('local', {
  successRedirect: '/secret',
  failureRedirect: '/login?error=badlogin'
}));

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
})

module.exports = router;
