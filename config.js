
/* jshint node: true */
/* jshint esnext: true */

exports.DATABASE_URL = process.env.DATABASE_URL ||
                       global.DATABASE_URL ||
                      'mongodb://localhost/node-catalog';
exports.JV_TEST_DATABASE_URL = (process.env.TEST_DATABASE_URL ||
                             global.TEST_DATABASE_URL ||
                             'mongodb://localhost/test-node-catalog');

exports.TEST_DATABASE_URL =
'mongodb://jvuser:leaf685@ds133331.mlab.com:33331/test-node-catalog';

exports.PORT = process.env.PORT || 8080;
