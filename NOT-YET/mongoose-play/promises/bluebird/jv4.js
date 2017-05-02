
/* jshint node: true */
/* jshint esnext: true */

'use strict';

var Promise = require('bluebird');

// EXAMPLE 4
// EXAMPLE 4
// EXAMPLE 4
// If the function is expecting a Promise to be returned
// Promise.reject will allow the error handler to work correctly
function getPromise4(someparameter) {
    if (!someparameter) {
        return Promise.reject(new Error("Bad parameter"));
    }

    return new Promise(function(resolve, reject) {
        return 'ok';
    });
}
getPromise4()
    .then(function(finalResult) {
        console.log("Final result " + finalResult);
    })
    .error(function(e) {
        console.log("Error handler " + e);
    })
    .catch(function(e) {
        console.log("Catch handler " + e);
    });

