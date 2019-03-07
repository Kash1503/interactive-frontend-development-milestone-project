//set marker arrays
var markersFood = [];
var markersBar = [];
var markersLodging = [];
var markersMuseum = [];

//set arrays to hold all requested info for each place
var museumPlace = [];
var foodPlace = [];
var barPlace = [];
var lodgingPlace = [];

//set label variables
var labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var labelIndex = 0;

//create variables to use in places details search
const baseURL = "https://maps.googleapis.com/maps/api/place/details/json?placeid="
const urlEnd = "&fields=formatted_address,formatted_phone_number,website&key=AIzaSyCHmEm8NDMhkK4kCH91h7RlKNf83AmKTR4"

//Initialise Google Maps (taken from Google Maps API Documentation and edited to fit my page, added code for second search bar)
function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: 0, lng: 0 },
    zoom: 2,
    mapTypeId: 'roadmap'
  });

  //take input from search bars
  var input = document.getElementById('search-bar');
  var input2 = document.getElementById('search-bar2');

  //create google SearchBox using input variables
  var searchBox = new google.maps.places.SearchBox(input);
  var searchBox2 = new google.maps.places.SearchBox(input2);

  //Listen for the 'bounds_changed' event and set the bounds of searchBox
  map.addListener('bounds_changed', function() {
    searchBox.setBounds(map.getBounds());
  });
  map.addListener('bounds_changed', function() {
    searchBox2.setBounds(map.getBounds());
  });

  //Listen for 'places_changed' event 
  searchBox.addListener('places_changed', function() {

    //move the viewport to the map section
    window.location.href = "#map-section";

    //set places variable to places found with searchBox
    var places = searchBox.getPlaces();

    //if there are no places, return
    if (places.length == 0) {
      return;
    }

    //create the bounds variable
    var bounds = new google.maps.LatLngBounds();

    //for each place in places, check if place is within the viewport, if not, extend the bounds
    places.forEach(function(place) {
      if (!place.geometry) {
        console.log("Returned place contains no geometry");
        return;
      }

      if (place.geometry.viewport) {
        bounds.union(place.geometry.viewport);
      }
      else {
        bounds.extend(place.geometry.location);
      }
    });

    //set the center of the map to the center of the bounds variable
    map.setCenter(bounds.getCenter());

    //set the zoom to 13
    map.setZoom(13);

    //remove current markers if there are any
    removeMarkers(markersFood);
    removeMarkers(markersBar);
    removeMarkers(markersLodging);
    removeMarkers(markersMuseum);
    museumPlace = [];
    foodPlace = [];
    barPlace = [];
    lodgingPlace = [];

    //run the findPlaces function, passing in the current center of the map
    findPlaces(map.getCenter());

    //display information for first 5 items in array
    window.setTimeout(displayInfo, 2000);
  });

  //Listen for 'places_changed' event 
  searchBox2.addListener('places_changed', function() {

    //move the viewport to the map section
    window.location.href = "#map-section";

    //set places variable to places found with searchBox
    var places2 = searchBox2.getPlaces();

    //if there are no places, return
    if (places2.length == 0) {
      return;
    }

    //create the bounds variable
    var bounds2 = new google.maps.LatLngBounds();

    //for each place in places, check if place is within the viewport, if not, extend the bounds
    places2.forEach(function(place) {
      if (!place.geometry) {
        console.log("Returned place contains no geometry");
        return;
      }

      if (place.geometry.viewport) {
        bounds2.union(place.geometry.viewport);
      }
      else {
        bounds2.extend(place.geometry.location);
      }
    });

    //set the center of the map to the center of the bounds variable
    map.setCenter(bounds2.getCenter());

    //set the zoom to 13
    map.setZoom(13);

    //remove current markers if there are any
    removeMarkers(markersFood);
    removeMarkers(markersBar);
    removeMarkers(markersLodging);
    removeMarkers(markersMuseum);
    museumPlace = [];
    foodPlace = [];
    barPlace = [];
    lodgingPlace = [];

    //run the findPlaces function, passing in the current center of the map
    findPlaces(map.getCenter());

    //display information for first 5 items in array
    window.setTimeout(displayInfo, 2000);

  });

  //when filter button is pressed, 
  google.maps.event.addDomListener(document.getElementById('filter'), 'click', function() {
    if ($("#mapFilter option:selected").val() == 'museum') {
      changeMarkers(markersMuseum);
    };
    if ($("#mapFilter option:selected").val() == 'food') {
      changeMarkers(markersFood);
    };
    if ($("#mapFilter option:selected").val() == 'bar') {
      changeMarkers(markersBar);
    };
    if ($("#mapFilter option:selected").val() == 'lodging') {
      changeMarkers(markersLodging);
    };
  });


  //custom function to create a nearby places search
  function findPlaces(currentPos) {

    //Create variables to hold request data for each type of place with a 2000m radius
    var requestFood = {
      location: currentPos,
      radius: '2000',
      type: ['restaurant']
    };

    var requestBar = {
      location: currentPos,
      radius: '2000',
      type: ['bar']
    };

    var requestLodging = {
      location: currentPos,
      radius: '2000',
      type: ['lodging']
    };

    var requestMuseum = {
      location: currentPos,
      radius: '2000',
      type: ['museum']
    };

    //service variable to initiate the nearby search
    service = new google.maps.places.PlacesService(map);
    service.nearbySearch(requestFood, function(results, status) {
      callback(results, status, markersFood, foodPlace);
    });
    service.nearbySearch(requestBar, function(results, status) {
      callback(results, status, markersBar, barPlace);
    });
    service.nearbySearch(requestLodging, function(results, status) {
      callback(results, status, markersLodging, lodgingPlace);
    });
    service.nearbySearch(requestMuseum, function(results, status) {
      callback(results, status, markersMuseum, museumPlace);
    });
  }

  //function to check Places service status and run the createMarker function for the first 5 places in the array if the status is 'OK'
  function callback(results, status, markerArray, resultArray) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      //check to ensure there is an object at current item in array, if so, push the result to arrays
      for (var i = 0; i < 5; i++) {
        if (results[i] !== undefined) {
          resultArray.push(results[i]);
          createMarker(results[i], markerArray);
        }
      }
      //reset label index variable to 0 to re-use for the next array
      labelIndex = 0;
      //log the array to the console for debugging
      console.log(resultArray);

      //set the markers to display only those of the current filter
      if ($("#mapFilter option:selected").val() == 'museum') {
        changeMarkers(markersMuseum);
      };
      if ($("#mapFilter option:selected").val() == 'food') {
        changeMarkers(markersFood);
      };
      if ($("#mapFilter option:selected").val() == 'bar') {
        changeMarkers(markersBar);
      };
      if ($("#mapFilter option:selected").val() == 'lodging') {
        changeMarkers(markersLodging);
      };
    }
  }

  //function to create a marker at the given place location in the results array
  function createMarker(place, markerArray) {

    //create marker with label from labels variable
    var marker = new google.maps.Marker({
      map: map,
      position: place.geometry.location,
      label: labels[labelIndex++ % labels.length],
      title: place.name
    });
    markerArray.push(marker);
  }

  function removeMarkers(markersArray) {

    //Cycle through the array and set markers to null
    for (i = 0; i < markersArray.length; i++) {
      if (markersArray[i].getMap() != null) {
        markersArray[i].setMap(null);
      }
      else markersArray[i].setMap(map);
    }
    markersArray = [];
  }

  function changeMarkers(markerArray) {

    //set all markers to null
    for (i = 0; i < markersFood.length; i++) {
      markersFood[i].setMap(null);
    }
    for (i = 0; i < markersBar.length; i++) {
      markersBar[i].setMap(null);
    }
    for (i = 0; i < markersLodging.length; i++) {
      markersLodging[i].setMap(null);
    }
    for (i = 0; i < markersMuseum.length; i++) {
      markersMuseum[i].setMap(null);
    }

    //enable the selected marker on the map
    for (i = 0; i < markerArray.length; i++) {
      markerArray[i].setMap(map);
    }

  }

  function displayInfo(markerArray) {

    //remove existing photos and info
    removeInfo('#museum_image_');
    removeInfo('#museum_title_');
    removeInfo('#museum_info_');

    removeInfo('#hotel_image_');
    removeInfo('#hotel_title_');
    removeInfo('#hotel_info_');

    removeInfo('#bar_image_');
    removeInfo('#bar_title_');
    removeInfo('#bar_info_');

    removeInfo('#restaurant_image_');
    removeInfo('#restaurant_title_');
    removeInfo('#restaurant_info_');

    //display photos from markers in each array
    getPhotos("#museum_image_", museumPlace);
    getInfo("#museum_title_", "#museum_info_", museumPlace);

    getPhotos("#bar_image_", barPlace);
    getInfo("#bar_title_", "#bar_info_", barPlace);

    getPhotos("#restaurant_image_", foodPlace);
    getInfo("#restaurant_title_", "#restaurant_info_", foodPlace);

    getPhotos("#hotel_image_", lodgingPlace);
    getInfo("#hotel_title_", "#hotel_info_", lodgingPlace);
  }

  function getPhotos(id, placeArray) {

    //loop through the array, find the photo URL and create a new img element with the found URL as the source
    for (i = 0; i < placeArray.length; i++) {
      if (placeArray[i].photos !== undefined) {
        $(id + i).html(
          `<img src="${placeArray[i].photos[0].getUrl()}" alt="${id + i}" class="marker-photo"><img>`
        );
      }
      else {
        $(id + i).html(
          `<div class="marker-frame-text">Sorry, no image available!</div>`
        );
      }
    }
    //if less than 5 results are returned, apply text indicating that there was no result
    for (i = placeArray.length; i < 5; i++) {
      $(id + i).html(
        `<div class="marker-frame-text">Sorry, we didnt find anything else!</div>`
      );
    }
  }

  function getInfo(titleID, infoID, placeArray) {

    for (i = 0; i < placeArray.length; i++) {
      //check to ensure the 'name' attribute is not undefined, if not then printname to the titleID div
      if (placeArray[i].name !== undefined) {
        $(titleID + i).html(
          `${placeArray[i].name}`);
      }

      //if it is undefined, return a message stating there is no name available
      else {
        $(titleID + i).html(
          `<span class="info-name">Sorry, no name available!</span>`
        );
      }

      //check to ensure there is a 'rating' attribute in the array item, if so then print rating to infoID div
      if (placeArray[i].rating !== undefined) {
        $(infoID + i).html(
          `<span class="info-name">Rating:</span> ${placeArray[i].rating.toString()} <br>`
        );
      }

      //if it is undefined or null then print a message stating there is no rating available
      else {
        $(infoID + i).html(
          `<span class="info-name">Rating:</span> Sorry, none available! <br>`
        );
      }

      //check to ensure the user_rating_total exists in the array item, if not then append total ratings to infoID div
      if (placeArray[i].user_ratings_total !== undefined) {
        $(infoID + i).append(
          `<span class="info-name">Number of user ratings:</span> ${placeArray[i].user_ratings_total.toString()}`
        );
      }

      //if it is undefined or null, print an error message
      else {
        $(infoID + i).append(
          `<span class="info-name">Number of user ratings:</span> Sorry, not available!`
        );
      }

      //get the address and contact details from a places details search
      getPlaceDetails(placeArray[i], infoID, i);

    }
  }

  function getPlaceDetails(place, infoID, i) {

    //create request to use for details search
    var request = {
      fields: ["formatted_address", "formatted_phone_number", "website"],
      placeId: place.place_id,
    };

    //get the details of the requested place from place_ID
    service = new google.maps.places.PlacesService(map);
    service.getDetails(request, function(results, status) {
      detailsCallback(results, status, infoID, i, place);
    });

  }

  function detailsCallback(results, status, infoID, i, place) {

    if (status == google.maps.places.PlacesServiceStatus.OK) {

      //display address information in relevant div
      if (results.fortmatted_address !== null) {
        $(infoID + i).append(
          `<br><span class="info-name">Address:</span> ${results.formatted_address.toString()}`
        );
      }
      else {
        $(infoID + i).append(
          `<br><span class="info-name">Address:</span> Sorry, no address available!`
        );
      }

      //display contact information in relevant div
      if (results.formatted_phone_number !== undefined) {
        $(infoID + i).append(
          `<br><span class="info-name">Phone:</span> ${results.formatted_phone_number.toString()}`
        );
      }
      else {
        $(infoID + i).append(
          `<br><span class="info-name">Phone:</span> Sorry, no phone number available!`
        );
      }

      //display website information in relevant div
      if (results.website !== undefined) {
        $(infoID + i).append(
          `<br><span class="info-name">Wesite:</span> <a href="${results.website.toString()}" target="_blank">Click here to go to the website</a>`
        );
      }
      else {
        $(infoID + i).append(
          `<br><span class="info-name">Wesite:</span> Sorry, no website available!`
        );
      }
    }
    else if (status == google.maps.places.PlacesServiceStatus.OVER_QUERY_LIMIT) {
      setTimeout(function() {
        getPlaceDetails(place, infoID, i);
      }, 1000)
    }
  }

  function removeInfo(id) {

    //go through the given divs and remove the html from them
    for (i = 0; i < 5; i++) {
      $(id + i).html(
        ``);
    }
  }

}
//Run initMap function once 'window' has loaded
google.maps.event.addDomListener(window, 'load', initMap);
