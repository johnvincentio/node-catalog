/* jshint node: true */
/* jshint esnext: true */

'use strict';

const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const {LOCATIONS1} = require('../helpers/helper');

const {Locations1Model} = require('../models/locations1');

router.get('/', (req, res) => {
    Locations1Model
        .find()
        .limit(100)
        .exec()
        .then(items => {
            res.json(items.map(item => item.getAll()));
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({message: 'Internal Server error'});
        });
});

router.get('/:id', (req, res) => {
    Locations1Model
        .findById(req.params.id)
        .exec()
        .then(item => {
            if (item) {
                res.json(item.getAll());
            }
            else {
                res.status(204).json({message: `Record ${req.params.id} not found`});
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({message: 'Internal Server error'});
        });
});

router.post('/', jsonParser, (req, res) => {
    const requiredFields = LOCATIONS1.required_keys;
    for (let i = 0; i < requiredFields.length; i++) {
        const field = requiredFields[i];
        if (!(field in req.body)) {
            const message = `Missing \`${field}\` in request body`;
            console.error(message);
            return res.status(400).send(message);
        }
    }

    Locations1Model.create(LOCATIONS1.create(req.body))
        .then(item => res.status(201).json(item.getAll()))
        .catch(err => {
            console.error(err);
            res.status(500).json({message: 'Internal Server error'});
        });
});

router.delete('/:id', (req, res) => {
    Locations1Model
        .findByIdAndRemove(req.params.id)
        .exec()
        .then(() => {
            console.log(`Deleting item \`${req.params.id}\``);
            res.status(204).end();
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({message: 'Internal Server error'});
        });
});

module.exports = router;
