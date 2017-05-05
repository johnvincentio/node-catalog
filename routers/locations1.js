/* jshint node: true */
/* jshint esnext: true */

'use strict';

const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const {Locations1Model} = require('../models/locations1');

router.get('/', (req, res) => {
    console.log("--- get all locations1");
    Locations1Model
        .find()
        .limit(100)
        .exec()
        .then(items => {
            res.json(items);
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({message: 'Internal Server error'});
        });
});

module.exports = router;

//             res.json(items.map(item => item.getAll()));
