
/* jshint node: true */
/* jshint esnext: true */

'use strict';

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/blogDB');

var blogSchema = new mongoose.Schema({
    title: String
});
const Blog = mongoose.model('Blog', blogSchema);

mongoose.connection.once('open', function () {
    console.info('connected to database blogDB');

    Blog.findOne({}, function(err, obj) {
        if (err) {
            console.log("Error:",err);
        }
        console.log("Load:",obj);
    });
    console.log("After find 99");
});

setTimeout(function() {
    mongoose.disconnect();
}, 3000);
