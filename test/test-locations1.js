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

const {LOCATIONS1} = require('../helpers/helper');

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
        seqno: i
    };
}

function seedData() {
//    console.info('seeding data');
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

function checkres(res, status, many) {
    res.should.have.status(status);    // 2
/* jshint -W030 */
    res.should.be.json;
    if (many) {
        res.body.length.should.be.at.least(1);
        res.body.should.be.a('array');
        res.body.forEach(function(item) {
            item.should.be.a('object');
            item.should.include.keys(LOCATIONS1.expected_keys);
        });
    }
    else {
    res.body.should.be.a('object');
    res.body.should.include.keys(LOCATIONS1.expected_keys);
    }
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
                .get(LOCATIONS1.endpoint)               // 1
                .then(function(_res) {
                    res = _res;
                    checkres(res, 200, true);           // 2
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
                .get(LOCATIONS1.endpoint)           // 1
                .then(function(res) {
                    checkres(res, 200, true);       // 2
                    _res = res;
                    return Locations1Model.findById(res.body[0].id).exec();      // 3
                })
                .then(function(doc) {      // 4
                    LOCATIONS1.checkEqual(doc, _res.body[0]);
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
                        .get(LOCATIONS1.endpoint+doc.id);     // 2
                })
                .then(function(res) {
                    checkres(res, 200, false);                // 3
                    LOCATIONS1.checkEqual(doc, res.body);     // 4
                });
        });
    });

    describe('POST endpoint', function() {
/*
 strategy:
    1. create a new record
    2. post the record
    3. prove res has right status, data type
    4. verify fields have correct values
    5. get the record by id
    6. verify record is identical to the new record.
*/
        it('should add a new record', function() {
            const data = generateData(1);     // 1

            return chai.request(app)
                .post(LOCATIONS1.endpoint)              // 2
                .send(data)
                .then(function(res) {
                    res.should.have.status(201);        // 3
                /* jshint -W030 */
                    res.should.be.json;
                    res.body.should.be.a('object');
                    res.body.should.include.keys(LOCATIONS1.expected_keys);
                    res.body.id.should.not.be.null;

                    data.id = res.body.id;
                    LOCATIONS1.checkEqual(data, res.body);     // 4

                    return Locations1Model.findById(res.body.id).exec();      // 5
                })
                .then(function(doc) {      // 6
                    LOCATIONS1.checkEqual(doc, data);
                });
        });
    });

    describe('POST endpoint error conditions', function() {

/*
strategy:
1. create a new record missing title field
2. make a POST request with that record
3. ensure status code = 400
*/
        it('should fail to add a new record - missing title', function() {
            const newBlog = generateData();
            delete newBlog.title;
            chai.request(app)
                .post('/blog')
                .send(newBlog)
            .then(() => {
                throw Error('should have failed with a 400');
            })
            .catch(e => {
                e.status.should.equal(400);
            });
        });

        /*
strategy:
1. create a new record missing content field
2. make a POST request with that record
3. ensure status code = 400
*/
        it('should fail to add a new record - missing content', function() {
            const newBlog = generateData();
            delete newBlog.content;
            chai.request(app)
                .post('/blog')
                .send(newBlog)
            .then(() => {
                throw Error('should have failed with a 400');
            })
            .catch(e => {
                e.status.should.equal(400);
            });
        });

/*
strategy:
1. create a new record missing firstName field
2. make a POST request with that record
3. ensure status code = 400
*/
        it('should fail to add a new record - missing firstName', function() {
            const newBlog = generateData();
            delete newBlog.author.firstName;
            chai.request(app)
                .post('/blog')
                .send(newBlog)
            .then(() => {
                throw Error('should have failed with a 400');
            })
            .catch(e => {
                e.status.should.equal(400);
            });
        });

/*
strategy:
1. create a new record missing lastName field
2. make a POST request with that record
3. ensure status code = 400
*/
        it('should fail to add a new record - missing lastName', function() {
            const newBlog = generateData();
            delete newBlog.author.lastName;
            chai.request(app)
                .post('/blog')
                .send(newBlog)
            .then(() => {
                throw Error('should have failed with a 400');
            })
            .catch(e => {
                e.status.should.equal(400);
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
                    return chai.request(app).delete(`${LOCATIONS1.endpoint}${doc.id}`);   // 2
                })
                .then(function(res) {
                    res.should.have.status(204);        // 3
                    return Locations1Model.findById(_doc.id).exec();      // 4
                })
                .then(function(_gone) {      // 5
                    should.not.exist(_gone);
                });
        });

/*
Strategy:
1. Create a non-existent Id
2. make a delete request for that id
3. assert that response has correct status code
*/
        it('delete by non-existent id', function() {
            let myid = mongoose.Types.ObjectId();       // 1
            return chai.request(app).delete(`${LOCATIONS1.endpoint}${myid}`)       // 2
            .then(res => {
                res.should.have.status(204);        // 3
            });
        });
    });
});
