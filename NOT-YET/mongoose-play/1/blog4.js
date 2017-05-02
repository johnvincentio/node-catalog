
/* jshint node: true */
/* jshint esnext: true */

'use strict';

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/blogDB');

const blogSchema = mongoose.Schema({
    title: {type: String, required: true},
    content: {type: String, required: true},
    author: {
        "firstName" : String,
        "lastName" : String
    },
    created: Date
}, {collection: 'blogs'});

blogSchema.methods.getAll = function() {
    return {
        id: this._id,
        title: this.title,
        content: this.content,
        author: this.author.firstName + ' ' + this.author.lastName,
        created: this.created
    };
};
blogSchema.methods.getAuthor = function() {
    return {
        id: this._id,
        author: this.author.firstName + ' ' + this.author.lastName
    };
};
const Blog = mongoose.model('Blog', blogSchema);

mongoose.connection.once('open', function () {
    console.info('connected to database blogDB');

    Blog.find().limit(3).exec()
    .then(blogs => {
        blogs.forEach(blog => {console.log(blog.getAuthor());});
    })
    .catch(err => {
        console.error(err);
    });
    console.log("After findOne");
});

setTimeout(function() {
    mongoose.disconnect();
}, 3000);

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
