/*jshint browser: true, jquery: true */
/*jshint multistr: true */

/*
use this for mocking data

var MOCK_DATA = {
"locations": {
    "hesLocations": [
      {
        "id": 1,
        "address": "29125 Smith Road",
        "city": "Romulus",
        "state": "MI",
        "zip": "48174",
        "phone": "(734) 595-7075",
        "fax": "(734) 595-9733",
        "branch": 9104,
        "seqNo": 1
      },
      {
        "id": 2,
        "address": "206 Route 109 East",
        "city": "Farmingdale",
        "state": "NY",
        "zip": "11735",
        "phone": "(631) 694-4422",
        "fax": "(866) 433-7814",
        "branch": 9184,
        "seqNo": 2
      },
      {
        "id": 3,
        "address": "2251 Sylvan Road, Suite 700",
        "city": "East Point",
        "state": "GA",
        "zip": "30334",
        "phone": "(404) 762-5636",
        "fax": "(866) 333-1405",
        "branch": 9384,
        "seqNo": 3
      },
      {
        "id": 10,
        "address": "500 Sandy Creek Road Bldg 2004 Ste 105",
        "city": "Fayetteville",
        "state": "GA",
        "zip": "30214",
        "phone": "(770) 560-2853",
        "branch": 9304,
        "seqNo": 4
      },
      {
        "id": 4,
        "address": "141 W. Airline Dr.",
        "city": "Kenner",
        "state": "LA",
        "zip": "70062",
        "phone": "(504) 441-8100",
        "fax": "(504) 441-8110",
        "branch": 9429,
        "seqNo": 5
      },
      {
        "id": 9,
        "address": "4555 Wynn Road",
        "city": "Las Vegas",
        "state": "NV",
        "zip": "89103",
        "phone": "(702) 876-2223",
        "fax": "(702) 876-2819",
        "branch": 9662,
        "seqNo": 6
      },
      {
        "id": 6,
        "address": "3111 N. Kenwood Street",
        "city": "Burbank",
        "state": "CA",
        "zip": "91505",
        "phone": "(818) 840-8247",
        "fax": "(818) 847-0941",
        "branch": 9684,
        "seqNo": 7
      },
      {
        "id": 7,
        "address": "91-209 Kalaeloa Blvd.",
        "city": "Kapolei",
        "state": "HI",
        "zip": "96707",
        "phone": "(808) 682-8200",
        "fax": "(808) 682-8100",
        "branch": 9778,
        "seqNo": 8
      },
      {
        "id": 11,
        "address": "6951 Norwitch Drive",
        "city": "Philadelphia",
        "state": "PA",
        "zip": "19153",
        "phone": "(215) 847-9870",
        "branch": 9162,
        "seqNo": 9
      }
    ],
    "cineleaseLocations": [
      {
        "id": 1,
        "address": "5375 W. San Fernando Rd",
        "city": "Los Angeles",
        "state": "CA",
        "zip": "90039",
        "phone": "(818) 841-8282",
        "fax": "(818) 954-9641",
        "name": "Los Angeles",
        "description": "Headquarters",
        "seqNo": 1
      },
      {
        "id": 2,
        "address": "10 Southwoods Pkwy - Suite 100",
        "city": "Atlanta",
        "state": "GA",
        "zip": "30354",
        "phone": "(404) 766-5855",
        "fax": "(404) 675-9225",
        "name": "Atlanta",
        "seqNo": 2
      },
      {
        "id": 8,
        "address": "7303 Burleson Rd - #200",
        "city": "Austin",
        "state": "TX",
        "zip": "78744",
        "phone": "(512) 386-5643",
        "fax": "(512) 386-8942",
        "name": "Austin",
        "seqNo": 3
      },
      {
        "id": 3,
        "address": "2558 W. 16th St.",
        "city": "Chicago",
        "state": "IL",
        "zip": "60608",
        "phone": "(312) 285-4710",
        "fax": "(312) 285-4710",
        "name": "Chicago",
        "seqNo": 4
      },
      {
        "id": 6,
        "address": "2205-G Distribution Center Dr.",
        "city": "Charlotte",
        "state": "NC",
        "zip": "28269",
        "phone": "(704) 494-8622",
        "fax": "(704) 494-8677",
        "name": "Charlotte",
        "seqNo": 5
      },
      {
        "id": 4,
        "address": "300 Jefferson Hwy - #1013",
        "city": "Jefferson",
        "state": "LA",
        "zip": "70121",
        "phone": "(504) 267-9075",
        "fax": "(504) 267-9076",
        "name": "New Orleans",
        "seqNo": 7
      },
      {
        "id": 9,
        "address": "5-43 54th Avenue",
        "city": "Long Island City",
        "state": "NY",
        "zip": "11101",
        "phone": "(718) 784-3439",
        "fax": "(718) 361-5289",
        "name": "New York",
        "seqNo": 8
      },
      {
        "id": 11,
        "address": "99-1245 Halawa Valley Street",
        "city": "Aiea",
        "state": "HI",
        "zip": "96701",
        "phone": "(808) 484-5706",
        "fax": "(808) 484-5707",
        "name": "Honolulu",
        "seqNo": 9
      },
      {
        "id": 12,
        "address": "Flugvallarvegur 5, 101 Reykjavik",
        "city": "Reykjavik",
        "state": "Iceland",
        "zip": "x",
        "phone": "+354-515-4665",
        "fax": "+354-515-4601",
        "name": "Reykjavik",
        "seqNo": 10
      },
      {
        "id": 13,
        "address": "Metropolitan Park Unit E Field Way",
        "city": "Greenford",
        "state": "Greater London",
        "zip": "UB6 7UP",
        "phone": "not yet available",
        "fax": "not yet available",
        "name": "United Kingdom",
        "seqNo": 11
      }
    ]
  }
};

function getLocationsData(url, callback) {
    setTimeout(function() {callback(MOCK_DATA);}, 100);
}
*/

function getLocationsData(url, callback) {
        console.log(">>> getLocations1Data");
        var request = $.ajax({
            url: url,
            dataType: 'json',
            type: 'GET'
        });
        request.done(function(data) {
            console.log("addData");
            callback(data);
        });
        request.fail(function(jqXHR, status) {
            console.log("ajax get failed; "+status);
        });
        console.log("<<< getLocations1Data");
}

function displayLocations1(data) {
    for (var index in data) {
       $('#hes_locations').append('<p>' + data[index].address + '</p>');
    }
}

function displayLocations2(data) {
    for (var index in data) {
       $('#cinelease_locations').append('<p>' + data[index].address + '</p>');
    }
}

function getAndDisplayLocations() {
    getLocationsData("api/locations1/", displayLocations1);
    getLocationsData("api/locations2/", displayLocations2);
}

$(function() {
    getAndDisplayLocations();
});
