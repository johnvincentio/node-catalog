/* jshint node: true */
/* jshint esnext: true */

/* global describe, it, before, after */

'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');

const {app, runServer, closeServer} = require('../server');

const {TEST_DATABASE_URL} = require('../config');

/* jshint -W098 */
const should = chai.should();

chai.use(chaiHttp);

describe('index.html', function() {

    before(function() {
        return runServer(TEST_DATABASE_URL);
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

describe('content.html', function() {

    before(function() {
        return runServer(TEST_DATABASE_URL);
    });

    after(function() {
        return closeServer();
    });

    it('should get content page', function() {
        return chai.request(app)
            .get('/content')
            .then(function(res) {
                res.should.have.status(200);
/* jshint -W030 */
                res.should.be.html;
            });
    });
});

describe('lighting.html', function() {

    before(function() {
        return runServer(TEST_DATABASE_URL);
    });

    after(function() {
        return closeServer();
    });

    it('should get lighting page', function() {
        return chai.request(app)
            .get('/lighting')
            .then(function(res) {
                res.should.have.status(200);
/* jshint -W030 */
                res.should.be.html;
            });
    });
});
