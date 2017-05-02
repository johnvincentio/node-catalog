/* jshint node: true */
/* jshint esnext: true */

'use strict';

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/blogDB');

var connection = mongoose.connection;

// mongoose.connect('mongodb://localhost/blogDB');

connection.on('error', console.error);
connection.once('open', function() {
    console.log("open!");
});

console.log("Open database");

// mongoose.connect('mongodb://localhost/blogDB');

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


