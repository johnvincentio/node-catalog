
/* jshint node: true */
/* jshint esnext: true */

'use strict';

const mongoose = require('mongoose');

const locations2Schema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    zip: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    fax: {
        type: String,
        required: false
    },
    seqno: {
        type: Number,
        required: true
    }
}, {collection: 'locations_2'});

locations2Schema.methods.getAll = function() {
    return {
        id: this._id,
        name: this.name,
        description: this.description,
        address: this.address,
        city: this.city,
        state: this.state,
        zip: this.zip,
        phone: this.phone,
        fax: this.fax,
        seqno: this.seqno
    };
};

const Locations2Model = mongoose.model('locations_2', locations2Schema);

module.exports = {Locations2Model};
