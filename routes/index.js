var express = require('express');
//var passport = require('passport');
var router = express.Router();
var mongoose = require('mongoose');
var userdata = mongoose.model('userdata');

//router.get('/signup', function(req, res) {
//  res.render('signup');
//});
//
//router.get('/login', function(req, res) {
//  res.render('login');
//});
//
//router.post('/login', passport.authenticate('local-login', {
//  successRedirect : '/', // redirect to the secure profile section
//  failureRedirect : '/login', // redirect back to the signup page if there is an error
//  failureFlash : true // allow flash messages
//}));
//
//router.post('/signup', passport.authenticate('local-signup', {
//  successRedirect : '/', // redirect to the secure profile section
//  failureRedirect : '/signup', // redirect back to the signup page if there is an error
//  failureFlash : true // allow flash messages
//}));
//
//router.get('/logout', function(req, res) {
//  req.logout();
//  res.redirect('/');
//});
//
//function isLoggedIn(req, res, next) {
//  if (req.isAuthenticated())
//    return next();
//
//  res.redirect('/');
//}

router.get('/', function(req, res) {
    res.render('index', { title: 'Express' });
});

router.post('/username', function(req, res, next) {
    var userdata = new Post(req.body);

    post.save(function(err, userdata){
        if(err){ return next(err); }

        res.json(userdata);
    });
});

router.get('/username', function(req, res, next) {
    Post.find(function(err, username){
        if(err){ return next(err); }

        res.json(username);
    });
});

router.param('userdata', function(req, res, next, id) {
    var query = Post.findById(id);

    query.exec(function (err, userdata){
        if (err) { return next(err); }
        if (!userdata) { return next(new Error("can't find card")); }

        req.userdata = userdata;
        return next();
    });
});

router.get('/username/:post', function(req, res, next) {
    req.post.populate(function(err, post) {
        res.json(post);
    });
});

module.exports = router;
