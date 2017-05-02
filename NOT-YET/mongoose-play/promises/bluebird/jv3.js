
/* jshint node: true */
/* jshint esnext: true */

'use strict';

var Promise = require('bluebird');

// EXAMPLE 3
// EXAMPLE 3
// EXAMPLE 3
// If you throw error instead of reject here outside the promise
// It will not be caught correctly unless you do a tradtional try/catch around the getPromise3() call
function getPromise3(someparameter) {
    if (!someparameter) {
        throw new Error("Bad parameter");
    }

    return new Promise(function(resolve, reject) {
        return 'ok';
    });
}
try { // this is ugly, we want to avoid this!
    getPromise3()
        .then(function(finalResult) {
            console.log("Final result " + finalResult);
        })
        .error(function(e) {
            console.log("Error handler " + e);
        })
        .catch(function(e) {
            console.log("Catch handler " + e);
        });
} catch (exception) {
    console.log("ZOMG CRASH!");
}
