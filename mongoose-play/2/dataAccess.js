
/* jshint node: true */
/* jshint esnext: true */

'use strict';

const {BlogModel} = require('./model');

console.log("starting dataAccess.js");
console.log("BlogModel "+BlogModel);

function DataAccess() {
}

DataAccess.prototype.getAll = function() {
    BlogModel.find().limit(3).exec()
    .then(blogs => {
        let jv = blogs.map(blog => blog.getAll());
        console.log("jv :"+JSON.stringify(jv));
//        blogs.forEach(blog => {console.log(blog.getAuthor());});
    })
    .catch(err => {
        console.error(err);
    });
    console.log("After findOne");
};

DataAccess.prototype.getAuthor = function() {
    BlogModel.find().limit(3).exec()
    .then(blogs => {
        let jv = blogs.map(blog => blog.getAuthor());
        console.log("jv :"+JSON.stringify(jv));
//        blogs.forEach(blog => {console.log(blog.getAuthor());});
    })
    .catch(err => {
        console.error(err);
    });
    console.log("After findOne");
};

module.exports = DataAccess;

/*
    .then(blogs => {
        blogs.forEach(function(blog) {console.log(blog.getAuthor());});
    })

    .then(blogs => {
        blogs.forEach(blog => {console.log(blog.getAuthor());});
    })
*/

/*
    Blog.find({}, function(err, obj) {
        if (err) {
            console.log("Error:",err);
        }
//        console.log("getAll: ",obj.getAll());
//        console.log("getAuthor: ",obj.getAuthor());
    });
    console.log("After findOne");
*/

