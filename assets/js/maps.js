//set markers array
var markers = [];

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
      for (i = 0; i < markers.length; i++) {
        if (markers[i].getMap() != null) {
          markers[i].setMap(null);
        }
        else markers[i].setMap(map);
      }
    markers = [];

  //run the findPlaces function, passing in the current center of the map
  findPlaces(map.getCenter());
});

//custom function to create a nearby places search
function findPlaces(currentPos) {

  //log the currentPos LatLng for debugging purposes
  console.log(currentPos.toString());

  //Create the request variable using currentPos as the location, 2000m radius and set the type to search
  var request = {
    location: currentPos,
    radius: '2000',
    type: ['restaurant']
  };

  //service variable to initiate the nearby search
  service = new google.maps.places.PlacesService(map);
  service.nearbySearch(request, callback);
}

//function to check Places service status and run the createMarker function for the first 10 places in the array if the status is 'OK'
function callback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < 10; i++) {
      createMarker(results[i]);
    }
  }
}

//function to create a marker at the given place location in the results array
function createMarker(place) {
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location
  });
  markers.push(marker);
}
}

//Run initMap function once 'window' has loaded
google.maps.event.addDomListener(window, 'load', initMap);
