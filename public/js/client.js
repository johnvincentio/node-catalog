/*jshint browser: true, jquery: true */
/*jshint multistr: true */

/*


insert into hes_db.cinelease_locations (id, name, description, address, city, state, zip, phone, fax, seq_no)
values (1, 'Los Angeles', 'Headquarters', '5375 W. San Fernando Rd', 'Los Angeles', 'CA', '90039', '(818) 841-8282', '(818) 954-9641', 1);

insert into hes_db.cinelease_locations (id, name, description, address, city, state, zip, phone, fax, seq_no)
values (2, 'Atlanta', 'null', '10 Southwoods Pkwy - Suite 100', 'Atlanta', 'GA', '30354', '(404) 766-5855', '(404) 675-9225', 2);

insert into hes_db.cinelease_locations (id, name, description, address, city, state, zip, phone, fax, seq_no)
values (8, 'Austin', 'null', '7303 Burleson Rd - #200', 'Austin', 'TX', '78744', '(512) 386-5643', '(512) 386-8942', 3);

insert into hes_db.cinelease_locations (id, name, description, address, city, state, zip, phone, fax, seq_no)
values (3, 'Chicago', 'null', '2558 W. 16th St.', 'Chicago', 'IL', '60608', '(312) 285-4710', '(312) 285-4710', 4);

insert into hes_db.cinelease_locations (id, name, description, address, city, state, zip, phone, fax, seq_no)
values (6, 'Charlotte', 'null', '2205-G Distribution Center Dr.', 'Charlotte', 'NC', '28269', '(704) 494-8622', '(704) 494-8677', 5);

insert into hes_db.cinelease_locations (id, name, description, address, city, state, zip, phone, fax, seq_no)
values (4, 'New Orleans', 'null', '300 Jefferson Hwy - #1013', 'Jefferson', 'LA', '70121', '(504) 267-9075', '(504) 267-9076', 7);

insert into hes_db.cinelease_locations (id, name, description, address, city, state, zip, phone, fax, seq_no)
values (9, 'New York', 'null', '5-43 54th Avenue', 'Long Island City', 'NY', '11101', '(718) 784-3439', '(718) 361-5289', 8);

insert into hes_db.cinelease_locations (id, name, description, address, city, state, zip, phone, fax, seq_no)
values (11, 'Honolulu', 'null', '99-1245 Halawa Valley Street', 'Aiea', 'HI', '96701', '(808) 484-5706', '(808) 484-5707', 9);

insert into hes_db.cinelease_locations (id, name, description, address, city, state, zip, phone, fax, seq_no)
values (12, 'Reykjavik', 'null', 'Flugvallarvegur 5, 101 Reykjavik', 'Reykjavik', 'Iceland', 'x', '+354-515-4665', '+354-515-4601', 10);

insert into hes_db.cinelease_locations (id, name, description, address, city, state, zip, phone, fax, seq_no)
values (13, 'United Kingdom', 'null', 'Metropolitan Park Unit E Field Way', 'Greenford', 'Greater London', 'UB6 7UP', 'not yet available', 'not yet available', 11);

*/

/*

insert into hes_db.hes_locations (id, branch, address, city, state, zip, phone, fax, seq_no)
values (2, 9184, '206 Route 109 East', 'Farmingdale', 'NY', '11735', '(631) 694-4422', '(866) 433-7814', 2);

insert into hes_db.hes_locations (id, branch, address, city, state, zip, phone, fax, seq_no)
values (3, 9384, '2251 Sylvan Road, Suite 700', 'East Point', 'GA', '30334', '(404) 762-5636', '(866) 333-1405', 3);

insert into hes_db.hes_locations (id, branch, address, city, state, zip, phone, fax, seq_no)
values (10, 9304, '500 Sandy Creek Road Bldg 2004 Ste 105', 'Fayetteville', 'GA', '30214', '(770) 560-2853', 'null', 4);

insert into hes_db.hes_locations (id, branch, address, city, state, zip, phone, fax, seq_no)
values (4, 9429, '141 W. Airline Dr.', 'Kenner', 'LA', '70062', '(504) 441-8100', '(504) 441-8110', 5);

insert into hes_db.hes_locations (id, branch, address, city, state, zip, phone, fax, seq_no)
values (9, 9662, '4555 Wynn Road', 'Las Vegas', 'NV', '89103', '(702) 876-2223', '(702) 876-2819', 6);

insert into hes_db.hes_locations (id, branch, address, city, state, zip, phone, fax, seq_no)
values (6, 9684, '3111 N. Kenwood Street', 'Burbank', 'CA', '91505', '(818) 840-8247', '(818) 847-0941', 7);

insert into hes_db.hes_locations (id, branch, address, city, state, zip, phone, fax, seq_no)
values (7, 9778, '91-209 Kalaeloa Blvd.', 'Kapolei', 'HI', '96707', '(808) 682-8200', '(808) 682-8100', 8);

*/

// this is mock data, but when we create our API
// we'll have it return data that looks like this
/*


*/

var MOCK_DATA = {
    "locations": [
{
"id": "1",
"branch": "9104",
"address": "29125 Smith Road",
"city": "Romulus",
"state": "MI",
"zip": "48174",
"phone": "(734) 595-7075",
"fax": "(734) 595-9733",
"seq_no": "1"
},
{
"id": "7",
"branch": "9778",
"address": "91-209 Kalaeloa Blvd.",
"city": "Kapolei",
"state": "HI",
"zip": "96707",
"phone": "(808) 682-8200",
"fax": "(808) 682-8100",
"seq_no": "8"
},
{
"id": "11",
"branch": "9162",
"address": "6951 Norwitch Drive",
"city": "Philadelphia",
"state": "PA",
"zip": "19153",
"phone": "(215) 847-9870",
"fax": "(215) 847-9870",
"seq_no": "9"
}
    ]
};

// this function's name and argument can stay the
// same after we have a live API, but its internal
// implementation will change. Instead of using a
// timeout function that returns mock data, it will
// use jQuery's AJAX functionality to make a call
// to the server and then run the callbackFn
function getLocationsData(callbackFn) {
    // we use a `setTimeout` to make this asynchronous
    // as it would be with a real AJAX call.
    setTimeout(function(){ callbackFn(MOCK_DATA);}, 1);
}

// this function stays the same when we connect
// to real API later
function displayLocations(data) {
    for (var index in data.locations) {
       $('body').append('<p>' + data.locations[index].address + '</p>');
    }
}

// this function can stay the same even when we
// are connecting to real API
function getAndDisplayLocations() {
    getLocationsData(displayLocations);
}

//  on page load do this
$(function() {
    getAndDisplayLocations();
});
