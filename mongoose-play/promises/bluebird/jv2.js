
/* jshint node: true */
/* jshint esnext: true */

'use strict';

var Promise = require('bluebird');

function getPromise2() {
    return new Promise(function(resolve, reject) {
        throw new Error("Throw error");
    }).then(function(result) {
        console.log('Result 1 ' + result);
        return result;
    }).then(function(result) {
        console.log('Result 2 ' + result);
        return result;
    });
}
getPromise2()
    .then(function(finalResult) {
        console.log("Final result " + finalResult);
    })
    .error(function(e) {
        console.log("Error handler " + e);
    })
    .catch(function(e) {
        console.log("Catch handler " + e);
    });
