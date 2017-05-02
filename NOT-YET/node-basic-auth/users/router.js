/* jshint node: true */
/* jshint esnext: true */

'use strict';

const {BasicStrategy} = require('passport-http');
const express = require('express');
const jsonParser = require('body-parser').json();
const passport = require('passport');

const {User} = require('./models');

const router = express.Router();

router.use(jsonParser);

const strategy = new BasicStrategy(
    (username, password, cb) => {
        User
        .findOne({username})
        .exec()
        .then(user => {
            if (! user) {
                return cb(null, false, {message: 'Incorrect username'});
            }
            if (user.password !== password) {
                return cb(null, false, 'Incorrect password');
            }
            return cb(null, user);
        })
        .catch(err => cb(err));
});

passport.use(strategy);

var errorFormatter = function(err) {
    var errors = [];
    Object.keys(err.errors).forEach(function(field) {
        var errObj = err.errors[field];
        errors.push({path: errObj.path, message: errObj.message});
    });
    return errors;
};

router.post('/', (req, res) => {
    if (! req.body) {
        return res.status(400).json({message: 'No request body'});
    }

    let {username, password, firstName, lastName} = req.body;
    const newUser = new User({
        username: username,
        password: password,
        firstName: firstName,
        lastName: lastName
    });
    newUser.save(function(err, user) {
        if (err) {
            return res.status(422).json({error: errorFormatter(err)});
        }
        return res.status(201).json(user.apiRepr());
    });
});

// never expose all your users like below in a prod application
// we're just doing this so we have a quick way to see
// if we're creating users. keep in mind, you can also
// verify this in the Mongo shell.
router.get('/', (req, res) => {
    return User
        .find()
        .exec()
        .then(users => res.json(users.map(user => user.apiRepr())))
        .catch(err => console.log(err) && res.status(500).json({message: 'Internal server error'   }));
});


// NB: at time of writing, passport uses callbacks, not promises
const basicStrategy = new BasicStrategy(function(username, password, callback) {
    let user;
    User
    .findOne({username: username})
    .exec()
    .then(_user => {
        user = _user;
        if (! user) {
            return callback(null, false, {message: 'Incorrect username'});
        }
        return user.validatePassword(password);
    })
    .then(isValid => {
        if (! isValid) {
            return callback(null, false, {message: 'Incorrect password'});
        }
        else {
            return callback(null, user);
        }
    });
});


passport.use(basicStrategy);
router.use(passport.initialize());

router.get('/me',
    passport.authenticate('basic', {session: false}), (req, res) => res.json({user: req.user.apiRepr()})
);

module.exports = {router};
