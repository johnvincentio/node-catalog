
/* jshint node: true */
/* jshint esnext: true */

'use strict';

const mongoose = require('mongoose');

const locations1Schema = mongoose.Schema({
    branch: {
        type: Number,
        required: true
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
}, {collection: 'locations_1'});

locations1Schema.methods.getAll = function() {
    return {
        id: this._id,
        branch: this.branch,
        address: this.address,
        city: this.city,
        state: this.state,
        zip: this.zip,
        phone: this.phone,
        fax: this.fax,
        seqno: this.seqno
    };
};

const Locations1Model = mongoose.model('locations_1', locations1Schema);

module.exports = {Locations1Model};
