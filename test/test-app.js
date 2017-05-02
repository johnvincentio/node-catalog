/* jshint node: true */
/* jshint esnext: true */

/* global describe, it, before, after */

'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');

const {app, runServer, closeServer} = require('../server');

/* jshint -W098 */
const should = chai.should();

chai.use(chaiHttp);

describe('index.html', function() {

    before(function() {
        return runServer();
    });

    after(function() {
        return closeServer();
    });

    it('should get html', function() {
        return chai.request(app)
            .get('/')
            .then(function(res) {
                res.should.have.status(200);
/* jshint -W030 */
                res.should.be.html;
            });
    });
});
