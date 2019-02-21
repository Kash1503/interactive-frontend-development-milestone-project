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
    map.controls.push(input);
    map.controls.push(input2);

    map.addListener('bounds_changed', function() {
        searchBox.setBounds(map.getBounds());
    });
    
    map.addListener('bounds_changed', function(){
        searchBox2.setBounds(map.getBounds());
    });
    
    var markers = [];

    searchBox.addListener('places_changed', function() {
            var places = searchBox.getPlaces();

            if (places.length == 0) {
                return;
            }
        
        markers.forEach(function(marker) {
            marker.setMap(null);
          });
          markers = [];
          
          var bounds = new google.maps.LatLngBounds();
          places.forEach(function(place) {
            if (!place.geometry) {
              console.log("Returned place contains no geometry");
              return;
            }
            var icon = {
              url: place.icon,
              size: new google.maps.Size(71, 71),
              origin: new google.maps.Point(0, 0),
              anchor: new google.maps.Point(17, 34),
              scaledSize: new google.maps.Size(25, 25)
            };
            
            markers.push(new google.maps.Marker({
              map: map,
              icon: icon,
              title: place.name,
              position: place.geometry.location
            }));
            
            if (place.geometry.viewport) {
              bounds.union(place.geometry.viewport);
            } else {
              bounds.extend(place.geometry.location);
            }
          });
          map.fitBounds(bounds);
        });
        searchBox2.addListener('places_changed', function() {
            var places2 = searchBox2.getPlaces();

            if (places2.length == 0) {
                return;
            }
        
        markers.forEach(function(marker) {
            marker.setMap(null);
          });
          markers = [];
          
          var bounds2 = new google.maps.LatLngBounds();
          places2.forEach(function(place) {
            if (!place.geometry) {
              console.log("Returned place contains no geometry");
              return;
            }
            var icon = {
              url: place.icon,
              size: new google.maps.Size(71, 71),
              origin: new google.maps.Point(0, 0),
              anchor: new google.maps.Point(17, 34),
              scaledSize: new google.maps.Size(25, 25)
            };
            
            markers.push(new google.maps.Marker({
              map: map,
              icon: icon,
              title: place.name,
              position: place.geometry.location
            }));
            
            if (place.geometry.viewport) {
              bounds2.union(place.geometry.viewport);
            } else {
              bounds2.extend(place.geometry.location);
            }
          });
          map.fitBounds(bounds2);
        });
      }