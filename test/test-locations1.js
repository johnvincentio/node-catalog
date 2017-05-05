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

const ENDPOINT = '/api/locations1/';
const EXPECTED_KEYS = ['id', 'branch', 'city', 'state', 'zip', 'phone', 'fax', 'seqno', 'created'];

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
    1. get back all records returned by GET request
    2. prove res has right status, data type
    3. prove the number of records we got back is equal to number in db.
*/
        let res;
        it('should return all locations_1', function() {
            return chai.request(app)
                .get(ENDPOINT)               // 1
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

/*
 strategy:
    1. get back all records returned by GET request
    2. prove res has right status, data type
    3. get first document from the database
    4. verify fields have correct values
*/
       it('should return fields with correct values', function() {
           let _res;
            return chai.request(app)
                .get(ENDPOINT)               // 1
                .then(function(res) {
                    res.should.have.status(200);    // 2
    /* jshint -W030 */
                    res.should.be.json;
                    res.body.should.be.a('array');
                    res.body.length.should.be.at.least(1);

                    res.body.forEach(function(item) {
                        item.should.be.a('object');
                        item.should.include.keys(EXPECTED_KEYS);
                    });
                    _res = res.body[0];     // first record
                    return Locations1Model.findById(_res.id).exec();      // 3
                })
                .then(function(doc) {      // 4
                    doc.id.should.equal(_res.id);
                    doc.branch.should.equal(_res.branch);
                    doc.city.should.equal(_res.city);
                    doc.state.should.equal(_res.state);
                    doc.zip.should.equal(_res.zip);
                    doc.phone.should.equal(_res.phone);
                    doc.fax.should.equal(_res.fax);
                    doc.seqno.should.equal(_res.seqno);
                    doc.created.toJSON().should.equal(_res.created); // json formatted ISO date
                });
        });
    });

    describe('GET by ID endpoint', function() {
/*
 strategy:
    1. find one record
    2. get that record by id
    3. prove res has right status, data type
    4. verify fields have correct values
*/
        it('should get one record by id', function() {
            let doc;
            return Locations1Model        // 1
                .findOne()
                .exec()
                .then(function(_doc) {
                    doc = _doc;
                    return chai.request(app)
                        .get(ENDPOINT+doc.id);     // 2
                })
                .then(function(res) {
                    res.should.have.status(200);        // 3
    /* jshint -W030 */
                    res.should.be.json;
                    res.body.should.be.a('object');
                    res.body.should.include.keys(EXPECTED_KEYS);
                    res.body.id.should.equal(doc.id);          // 4
                    res.body.branch.should.equal(doc.branch);
                    res.body.city.should.equal(doc.city);
                    res.body.state.should.equal(doc.state);
                    res.body.zip.should.equal(doc.zip);
                    res.body.phone.should.equal(doc.phone);
                    res.body.fax.should.equal(doc.fax);
                    res.body.seqno.should.equal(doc.seqno);
                    res.body.created.should.equal(doc.created.toJSON()); // json formatted ISO date
                });
        });
    });

    describe('DELETE endpoint', function() {
/*
Strategy:
1. Get one record
2. make a delete request for that record's id
3. assert that response has correct status code
4. get the record by id
5. prove that record does not exist
*/
        it('should delete by id', function() {
            let _doc;
            return Locations1Model        // 1
                .findOne()
                .exec()
                .then(function(doc) {
                    _doc = doc;
                    return chai.request(app).delete(`${ENDPOINT}${doc.id}`);   // 2
                })
                .then(function(res) {
                    res.should.have.status(204);        // 3
                    return Locations1Model.findById(_doc.id).exec();      // 4
                })
                .then(function(_bad) {      // 5
                    should.not.exist(_bad);
                });
        });

/*
Strategy:
1. Create a non-existent Id
2. make a delete request for that id
3. assert that response has correct status code
*/
        it('delete blog by non-existent id', function() {
            let myid = mongoose.Types.ObjectId();       // 1
            return chai.request(app).delete(`${ENDPOINT}${myid}`)       // 2
            .then(res => {
                res.should.have.status(204);        // 3
            });
        });
    });
});
