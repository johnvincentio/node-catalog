/* jshint node: true */
/* jshint esnext: true */

'use strict';

const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const STATE_ABBREVIATIONS = Object.keys(require('./state-abbreviations'));

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        trim: true,
        required: [true, 'Username is required'],
        minlength: [6, 'Username (`{VALUE}`) has a minimum length of 6'],
        maxlength: [20, 'Username (`{VALUE}`) exceeds maximum length of 20'],
        unique: true
    },
    password: {
        type: String,
        trim: true,
        required: [true, 'Password is required']
    },
    firstName: {
        type: String,
        trim: true,
        default: ""
    },
    lastName: {
        type: String,
        trim: true,
        default: ""
    }
});

UserSchema.pre('init', function(next) {
    console.log("--- UserSchema.pre('init')");
    next();
});

UserSchema.pre('remove', function(next) {
    console.log("--- UserSchema.pre('remove')");
    next();
});

UserSchema.pre('validate', function(next) {
    console.log("--- pre validate");
    next();
});

UserSchema.pre('save', function(next) {
    console.log("--- UserSchema.pre('save'");
    let that = this;
    bcrypt.genSalt(10, function(err, salt) {
        if (err) {
            return next(err);
        }
        bcrypt.hash(that.password, salt, function(err, encrypted) {
            console.log("--- bcrypt.hash; password :"+that.password+":");
            if (err) {
                return next(err);
            }
            that.password = encrypted;
            next();
        });
    });
});

UserSchema.post('init', function(doc) {
    console.log('%s has been initialized from the db', doc._id);
});
UserSchema.post('validate', function(doc) {
    console.log('%s has been validated (but not saved yet)', doc._id);
});
UserSchema.post('save', function(doc) {
    console.log('%s has been saved', doc._id);
});
UserSchema.post('remove', function(doc) {
    console.log('%s has been removed', doc._id);
});

UserSchema.path('username').validate(function(value) {
    return ! value.match(/[^0-9a-z]/i);
}, 'Only letters and numbers allowed');

UserSchema.path('username').validate(function(value) {
    return value.match(/\d/);
}, 'At least one number required');

UserSchema.path('username').validate(function(value) {
    return value.match(/[a-z]/i);
}, 'At least one letter required');

UserSchema.path('username').validate(function(value, respond) {
    User.findOne({username: value}, function(err, user) {
        if (err) {
            throw err;
        }
        if (user) {
            return respond(false);
        }
        respond(true);
    });
}, 'Username already exists');


UserSchema.path('password').validate(function(value) {
    return value.match(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,15}$/);
}, 'Requires alphanumeric characters, 1 least 1 special character, 1 letter, 1 number, length 8-15');



UserSchema.path('firstName').validate(function(value) {
    return value.length > 5;
}, 'first name should be > 5 characters');

UserSchema.path('firstName').validate(function(value) {
    return value.length < 10;
}, 'first name should be < 10 characters');

UserSchema.path('lastName').validate(function(value) {
    return value.length < 20;
}, 'last name should be < 20 characters');

UserSchema.path('lastName').validate(function(value) {
    return value.length > 5;
}, 'last name should be > 5 characters');


UserSchema.methods.apiRepr = function() {
    return {
        username: this.username || '',
        firstName: this.firstName || '',
        lastName: this.lastName || ''
    };
};

UserSchema.methods.validatePassword = function(password) {
    return bcrypt.compare(password, this.password);
};

//UserSchema.statics.hashPassword = function(password) {
//    console.log("--- UserSchema.statics.hashPassword; password :"+password+":");
//    return bcrypt.hash(password, 10);
//};

const User = mongoose.model('User', UserSchema);

module.exports = {User};
