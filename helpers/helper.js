
/* jshint node: true */
/* jshint esnext: true */

exports.LOCATIONS1 = {
    endpoint: '/api/locations1/',
    expected_keys: ['id', 'branch', 'address', 'city', 'state', 'zip', 'phone', 'fax', 'seqno'],
    required_keys: ['branch', 'address', 'city', 'state', 'zip', 'phone', 'seqno'],
    checkEqual: function  (doc, res) {
        doc.id.should.equal(res.id);
        doc.branch.should.equal(res.branch);
        doc.address.should.equal(res.address);
        doc.city.should.equal(res.city);
        doc.state.should.equal(res.state);
        doc.zip.should.equal(res.zip);
        doc.phone.should.equal(res.phone);
        doc.fax.should.equal(res.fax);
        doc.seqno.should.equal(res.seqno);
    },
    create: function(data) {
        return {
            branch: data.branch,
            address: data.address,
            city: data.city,
            state: data.state,
            zip: data.zip,
            phone: data.phone,
            fax: data.fax,
            seqno: data.seqno
        };
    }
};
