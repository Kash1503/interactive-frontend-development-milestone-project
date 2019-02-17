function initAutocomplete(){
    var map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: -33.8688, lng: 151.2195},
          zoom: 13,
          mapTypeId: 'roadmap'
        });
        
        var input = document.getElementById('search-bar');
        var searchBox = new google.maps.places.SearchBox(input);
        map.controls.push(input);
        
        map.addListener('bounds_changed', function() {
          searchBox.setBounds(map.getBounds());
        });
        
        
}