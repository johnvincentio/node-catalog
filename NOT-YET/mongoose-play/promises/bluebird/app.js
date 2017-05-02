/* jshint node: true */
/* jshint esnext: true */

'use strict';

var Promise = require('bluebird');

// EXAMPLE 1
// EXAMPLE 1
// EXAMPLE 1
// ERROR HANDLER WILL CATCH REJECTION
function getPromise1() {
    return new Promise(function(resolve, reject) {
        reject(new Error("Rejected error"));
    }).then(function(result) {
        console.log('Result 1 ' + result);
        return result;
    }).then(function(result) {
        console.log('Result 2 ' + result);
        return result;
    });
}
getPromise1()
    .then(function(finalResult) {
        console.log("Final result " + finalResult);
    })
    .error(function(e) {
        console.log("Error handler " + e);
    })
    .catch(function(e) {
        console.log("Catch handler " + e);
    });

// EXAMPLE 2
// EXAMPLE 2
// EXAMPLE 2
// CATCH HANDLER WILL CATCH REJECTION
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
        return result;
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
