
/* jshint node: true */
/* jshint esnext: true */

exports.DATABASE_URL = process.env.DATABASE_URL ||
                       global.DATABASE_URL ||
                      'mongodb://localhost/node-catalog';

exports.TEST_DATABASE_URL = process.env.TEST_DATABASE_URL ||
                        'mongodb://localhost/test-node-catalog';

exports.PORT = process.env.PORT || 8080;
