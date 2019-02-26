var map;

//Initialise Google Maps (taken from Google Maps API Documentation and edited to fit my page, added code for second search bar)
function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: 0, lng: 0 },
    zoom: 2,
    mapTypeId: 'roadmap'
  });

  var input = document.getElementById('search-bar');
  var input2 = document.getElementById('search-bar2');
  var searchBox = new google.maps.places.SearchBox(input);
  var searchBox2 = new google.maps.places.SearchBox(input2);

  map.addListener('bounds_changed', function() {
    searchBox.setBounds(map.getBounds());
  });

  map.addListener('bounds_changed', function() {
    searchBox2.setBounds(map.getBounds());
  });

  searchBox.addListener('places_changed', function() {
    var places = searchBox.getPlaces();

    if (places.length == 0) {
      return;
    }

    var bounds = new google.maps.LatLngBounds();
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
    map.fitBounds(bounds);
    findPlaces(map.getCenter());
  });
  searchBox2.addListener('places_changed', function() {
    var places2 = searchBox2.getPlaces();

    if (places2.length == 0) {
      return;
    }

    var bounds2 = new google.maps.LatLngBounds();
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
    map.setCenter(bounds2.getCenter());
    map.setZoom(12);
    findPlaces(map.getCenter());
  });

  function findPlaces(currentPos) {
    console.log(currentPos.toString());
    var request = {
      location: currentPos,
      radius: '5000',
      type: ['restaurant']
    };

    service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, callback);
  }

  function callback(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
        var place = results[i];
        createMarker(results[i]);
      }
    }
  }

  function createMarker(place) {
    var marker = new google.maps.Marker({
      map: map,
      position: place.geometry.location
    });
  }
}


google.maps.event.addDomListener(window, 'load', initMap);
