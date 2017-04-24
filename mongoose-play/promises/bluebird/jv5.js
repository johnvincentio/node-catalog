
/* jshint node: true */
/* jshint esnext: true */

'use strict';

var Promise = require('bluebird');

// EXAMPLE 5
// EXAMPLE 5
// EXAMPLE 5
// All toggether now
function getPromise(param) {
    if (!param) {
        return Promise.reject(Error('bad param'));
    }

    return new Promise(function(resolve, reject) {
        resolve('foo');
    }).then(function(result) {
        console.log('Result 1 ' + result);
        // We don't need to call Promise.resolve here, the value is already resolved
        // We can just return it
        return result;
    }).then(function(result) {
        // We can also continue chaining thens as long as we either
        // 1 - return a value
        // 2 - return a promise
        console.log('Result 2 ' + result);
        // returning a value
        return result + 'jv';
    }).then(function(result) {
        console.log('Result 3 ' + result);
        // returning another promise
        return Promise.resolve(someOtherPromise);
    }).then(function(result) {
        console.log('Result 4 ' + result);
        return result + ' resolved';
    });
}

getPromise('something')
    .then(function(finalResult) {
        console.log("Final result " + finalResult);
    })
    .error(function(e) {
        console.log("Error handler " + e);
    })
    .catch(function(e) {
        console.log("Catch handler " + e);
    });


// Define another promise here
var someOtherPromise = new Promise(function(resolve, reject) {
    resolve('some other promise!');
});
