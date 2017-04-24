/* jshint node: true */

/* jshint esnext: true */

/*global describe, it, before, after */

'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');

const {app, runServer, closeServer} = require('../server');

const should = chai.should();

chai.use(chaiHttp);

describe('Recipes', function() {
    before(function() {
        return runServer();
    });

    after(function() {
        return closeServer();
    });

    it('should list recipes on GET', function() {
        // for Mocha tests, when we're dealing with asynchronous operations,
        // we must either return a Promise object or else call a `done` callback
        // at the end of the test. The `chai.request(server).get...` call is asynchronous
        // and returns a Promise, so we just return it.
        return chai.request(app)
            .get('/recipes')
            .then(function(res) {
                res.should.have.status(200);
            /* jshint -W030 */
                res.should.be.json;
                res.body.should.be.a('array');

                // because we create 2 items on app load
                res.body.length.should.be.at.least(1);
                // each item should be an object with key/value pairs
                // for 'name', 'ingredients'.
                const expectedKeys = ['id', 'name', 'ingredients'];
                res.body.forEach(function(item) {
                    item.should.be.a('object');
                    item.should.include.keys(expectedKeys);
                });
            });
    });

    it('should add a recipe on POST', function() {
        const newItem = {
            name: 'coffee',
            ingredients: ['a','b','c']
        };
        return chai.request(app)
            .post('/recipes')
            .send(newItem)
            .then(function(res) {
                res.should.have.status(201);
            /* jshint -W030 */
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.include.keys('id', 'name', 'ingredients');
            /* jshint -W030 */
                res.body.id.should.not.be.null;

                res.body.name.should.equal(newItem.name);

                res.body.ingredients.should.be.a('array');
            /* jshint -W030 */
                res.body.ingredients.should.not.be.empty;
                res.body.ingredients.should.include.members(newItem.ingredients);
            });
    });

    it('should update recipe on PUT', function() {
        const updateData = {
            name: 'foo',
            ingredients: ['a','b','c']
        };

        return chai.request(app)
            // first have to get so we have an idea of object to update
            .get('/recipes')
            .then(function(res) {
                updateData.id = res.body[0].id;
                return chai.request(app)
                    .put(`/recipes/${updateData.id}`)
                    .send(updateData);
            })
            .then(function(res) {
                res.should.have.status(200);
            /* jshint -W030 */
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.include.keys('id', 'name', 'ingredients');

                res.body.id.should.equal(updateData.id);
                res.body.name.should.equal(updateData.name);
                res.body.ingredients.should.include.members(updateData.ingredients);
            });
    });

    it('should delete recipes on DELETE', function() {
        return chai.request(app)
            // first have to get so we have an `id` of item
            // to delete
            .get('/recipes')
            .then(function(res) {
                return chai.request(app)
                    .delete(`/recipes/${res.body[0].id}`);
            })
            .then(function(res) {
                res.should.have.status(204);
            });
    });
});
