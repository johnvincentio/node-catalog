/* jshint node: true */
/* jshint esnext: true */

'use strict';

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

var connection = mongoose.createConnection('mongodb://localhost/blogDB');

connection.once('open', function () {
    console.info('connected to database blogDB');

    var blogSchema = new mongoose.Schema({
        title: String
    });

    const Blog = mongoose.model('Blog', blogSchema);

    Blog.findOne({}, function(err, obj) {
        if (err) {
            console.log("Error:",err);
        }
        console.log("Load:",obj);
    });
    console.log("After find 99");
});

/*
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

var connection = mongoose.connection;
connection.on('error', console.error);
connection.once('open', function() {
    console.log("open!");
});

console.log("Open database");

mongoose.connect('mongodb://localhost/blogDB');

var blogSchema = new mongoose.Schema({
    title: String
});

const Blog = mongoose.model('Blog', blogSchema);

Blog.findOne({}, function(err, obj) {
    if (err) {
        console.log("Error:",err);
    }
    console.log("Load:",obj);
});
console.log("After find 99");
*/

/*
const blogSchema = mongoose.Schema({
    title: {type: String, required: true},
    content: {type: String, required: true},
    author : {
        "firstName" : String,
        "lastName" : String
    }
});
*/

/*
    var blogSchema = new mongoose.Schema({
        title: String
    }, { collection: 'blogs' });
*/
