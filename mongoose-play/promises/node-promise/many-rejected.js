/* jshint node: true */
/* jshint esnext: true */

'use strict';

var req1 = new Promise(function(resolve, reject) {
    // A mock async action using setTimeout
    setTimeout(function() {
        resolve('First!');
    }, 4000);
});
var req2 = new Promise(function(resolve, reject) {
    // A mock async action using setTimeout
    setTimeout(function() {
        reject('Second!');
    }, 3000);
});
Promise.all([req1, req2]).then(function(results) {
    console.log('Then: ', results);
}).catch(function(err) {
    console.log('Catch: ', err);
});
