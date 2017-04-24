
/* jshint node: true */
/* jshint esnext: true */

'use strict';

new Promise(function(resolve, reject) {
    // A mock async action using setTimeout
    setTimeout( () => { resolve(10); }, 3000);
})
.then(function(num) { console.log('first then: ', num); return num * 2; })
.then(function(num) { console.log('second then: ', num); return num * 2; })
.then(function(num) { console.log('last then: ', num);});

/*
new Promise(function(resolve, reject) {
    // A mock async action using setTimeout
    setTimeout(function() { resolve(10); }, 3000);
})
*/
