/* jshint node: true */
/* jshint esnext: true */

/* global describe, it, before, after, beforeEach, afterEach */

'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const mongoose = require('mongoose');

const {app, runServer, closeServer} = require('../server');
const {TEST_DATABASE_URL} = require('../config');

const {Locations1Model} = require('../models/locations1');

/* jshint -W098 */
const should = chai.should();

chai.use(chaiHttp);

function generateData(i) {
    return {
        branch: faker.random.number(),
        address: faker.address.streetAddress(),
        city: faker.address.city(),
        state: faker.address.stateAbbr(),
        zip: faker.address.zipCode(),
        phone: faker.phone.phoneNumber(),
        fax: faker.phone.phoneNumber(),
        seqno: i,
        created: faker.date.past()
    };
}

function seedData() {
    console.info('seeding data');
    const data = [];
    for (let i=1; i<=10; i++) {
        data.push(generateData(i));
    }
    return Locations1Model.insertMany(data);    // this will return a promise
}

function tearDownDb() {
    console.warn('Deleting database');
    return new Promise((resolve, reject) => {
        console.warn('Deleting database');
        mongoose.connection.dropDatabase()
        .then(result => resolve(result))
        .catch(err => reject(err));
    });
}

describe('Locations_1 API resources', function() {

    before(function() {
        return runServer(TEST_DATABASE_URL);
    });

    beforeEach(function() {
        return seedData();
    });

    afterEach(function() {
        return tearDownDb();
    });

    after(function() {
        return closeServer();
    });

    describe('GET endpoint', function() {
/*
 strategy:
    1. get back all locations_1 returned by by GET request to `/api/locations1`
    2. prove res has right status, data type
    3. prove the number of blogs we got back is equal to number in db.
*/
        let res;
        it('should return all locations_1', function() {
            return chai.request(app)
                .get('/api/locations1')               // 1
                .then(function(_res) {      // 2
                    res = _res;
                    res.should.have.status(200);
                    res.body.length.should.be.at.least(1);
                    return Locations1Model.count();
                })
                .then(function(count) {     // 3
                    res.body.should.have.length.of(count);
                });
        });
    });
});
