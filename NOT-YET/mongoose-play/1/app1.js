/* jshint node: true */
/* jshint esnext: true */

'use strict';

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/blogDB');

mongoose.connection.on('open', function() {
//    console.log(mongoose.connection.collection);
    mongoose.connection.db.collectionNames(function(err, names) {
        console.log(names);
        mongoose.disconnect();
    });
});
