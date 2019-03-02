//set marker arrays
var markersFood = [];
var markersBar = [];
var markersLodging = [];
var markersMuseum = [];

//set label variables
var labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var labelIndex = 0;

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

    //run the findPlaces function, passing in the current center of the map
    findPlaces(map.getCenter());
  });

  //Listen for 'places_changed' event 
  searchBox2.addListener('places_changed', function() {

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

    //run the findPlaces function, passing in the current center of the map
    findPlaces(map.getCenter());
  });

  //when filter button is pressed, 
  google.maps.event.addDomListener(document.getElementById('filter'), 'click', function() {
    if ($("#mapFilter option:selected").val() == 'all') {
      showAllMarkers();
    };
    if ($("#mapFilter option:selected").val() == 'museum') {
      changeMarkers(markersMuseum);
    };
    if ($("#mapFilter option:selected").val() == 'food') {
      changeMarkers(markersFood);
    };
    if ($("#mapFilter option:selected").val() == 'drink') {
      changeMarkers(markersBar);
    };
    if ($("#mapFilter option:selected").val() == 'lodging') {
      changeMarkers(markersLodging);
    };
  });


  //custom function to create a nearby places search
  function findPlaces(currentPos) {

    //log the currentPos LatLng for debugging purposes
    console.log(currentPos.toString());

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
      callback(results, status, markersFood);
    });
    service.nearbySearch(requestBar, function(results, status) {
      callback(results, status, markersBar);
    });
    service.nearbySearch(requestLodging, function(results, status) {
      callback(results, status, markersLodging);
    });
    service.nearbySearch(requestMuseum, function(results, status) {
      callback(results, status, markersMuseum);
    });
  }

  //function to check Places service status and run the createMarker function for the first 10 places in the array if the status is 'OK'
  function callback(results, status, markerArray) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < 10; i++) {
        createMarker(results[i], markerArray);
      }
      //log array to console for debugging
      console.log(markerArray);
      labelIndex = 0;
    }
  }

  //function to create a marker at the given place location in the results array
  function createMarker(place, markerArray) {

    //create marker with label from labels variable
    var marker = new google.maps.Marker({
      map: map,
      position: place.geometry.location,
      label: labels[labelIndex++ % labels.length]
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

  function showAllMarkers() {

    //show all the current markers
    for (i = 0; i < markersFood.length; i++) {
      markersFood[i].setMap(map);
    }
    for (i = 0; i < markersBar.length; i++) {
      markersBar[i].setMap(map);
    }
    for (i = 0; i < markersLodging.length; i++) {
      markersLodging[i].setMap(map);
    }
    for (i = 0; i < markersMuseum.length; i++) {
      markersMuseum[i].setMap(map);
    }
  }

}

//Run initMap function once 'window' has loaded
google.maps.event.addDomListener(window, 'load', initMap);
