/*jshint browser: true, jquery: true */
/*jshint multistr: true */

var MOCK_DATA = {
    locations: {
        "metaKeywords":"","metaDescriptions":"","pageTitle":"Hertz Entertainment Services and Cinelease Rental Locations - Equipment, Vehicles and Lighting Rentals","slogan":"Studio and Production Equipment","h1":"Rental Locations","hesH2":"Hertz Entertainment Services","hesLocations":"To find the Hertz Entertainment Service branch location nearest to you, please view here.","hesCall":"CALL","hesGetDirections":"GET DIRECTIONS","hesCineleaseH2":"Cinelease","hesCineleaseLocation":"To find the Cinelease branch location nearest to you, please view here.","hesPhoneText":"Phone:","hesFaxText":"Fax:","clH2":"Cinelease","clCineleaseBranches":"To find the Cinelease branch location nearest to you, please view here."
    },
    home: {
        "metaKeywords":"","metaDescriptions":"","title":"","h1":"Studio and Production Equipment","cart":"Cart","viewCart":"View Cart","menuNav":"Menu","ads_slides":"","sidebar_slides":"","column_one_title":"About Us","column_one":"","column_two_title":"Our Companies","column_two":"","column_three_title":"Customer Service","column_three_name":"HES Contact Info","column_three_phone":"877-HES-7320","column_three_email":"HES@hertz.com","column_four_title":"Follow Us","column_four_facebook":"","column_four_twitter":"","column_four_google":"","column_four_linkedin":"","bottom_phone":"877-HES-7320 (877-437-7320)","privacy_policy_name":"Privacy Policy - Your Privacy Rights","privacy_policy_url":"","legal_policy_name":"Legal","legal_policy_url":"","contact_us_name":"Contact Us","contact_us_url":"","full_website":"Full Website","copyright":"&copy; 2014 Hertz Equipment Rental Corporation. All Rights Reserved.","ContactUsNav":"Contact Us","LocationsNav":"Locations","EquipmentNav":"Equipment","VehiclesNav":"Vehicles","LightingNav":"Lighting","GripEquipmentNav":"Grip Equipment","TruckPackagesNav":"Truck Packages"
    }
};

function getContent(callbackFn) {
    setTimeout(function(){ callbackFn(MOCK_DATA);}, 1);
}

function displayHomeContent(data) {
       $('#home').append('<p>' + data.home.h1 + '</p>');
}

function displayLocationsContent(data) {
       $('#locations').append('<p>' + data.locations.h1 + '</p>');
}

function getAndDisplayContent() {
    getContent(displayHomeContent);
    getContent(displayLocationsContent);
}

$(function() {
    getAndDisplayContent();
});
