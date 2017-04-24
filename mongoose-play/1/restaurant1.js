/* jshint node: true */
/* jshint esnext: true */

'use strict';

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

var connection = mongoose.connection;
connection.on('error', console.error);
connection.once('open', function() {
    console.log("open!");
});

console.log("Open database");

mongoose.connect('mongodb://localhost/restaurants-app');

const restaurantSchema = mongoose.Schema({
  name: {type: String, required: true},
  borough: {type: String, required: true},
  cuisine: {type: String, required: true}
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

Restaurant.findOne({}, function(err, obj) {
    if (err) {
        console.log("Error:",err);
    }
    console.log("Load:",obj);
});
console.log("After find 99");

/*
const restaurantSchema = mongoose.Schema({
  name: {type: String, required: true},
  borough: {type: String, required: true},
  cuisine: {type: String, required: true},
  address: {
    building: String,
    // coord will be an array of string values
    coord: [String],
    street: String,
    zipcode: String
  },
  // grades will be an array of objects
  grades: [{
    date: Date,
    grade: String,
    score: Number
  }]
});
*/
