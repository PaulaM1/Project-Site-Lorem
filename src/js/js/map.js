//Google Map
// function map() {
// 	const centerPnt = {lat: 52.229676, lng: 21.012229};

// 	const map = new google.maps.Map(document.getElementById('mainMap'), {
// 		zoom: 16,
// 		center: centerPnt,
// 		styles : [{"featureType": "water", "elementType": "geometry", "stylers": [{"color": "#e9e9e9"}, {"lightness": 17}]}, {"featureType": "landscape", "elementType": "geometry", "stylers": [{"color": "#f5f5f5"}, {"lightness": 20}]}, {"featureType": "road.highway", "elementType": "geometry.fill", "stylers": [{"color": "#ffffff"}, {"lightness": 17}]}, {"featureType": "road.highway", "elementType": "geometry.stroke", "stylers": [{"color": "#ffffff"}, {"lightness": 29}, {"weight": 0.2}]}, {"featureType": "road.arterial", "elementType": "geometry", "stylers": [{"color": "#ffffff"}, {"lightness": 18}]}, {"featureType": "road.local", "elementType": "geometry", "stylers": [{"color": "#ffffff"}, {"lightness": 16}]}, {"featureType": "poi", "elementType": "geometry", "stylers": [{"color": "#f5f5f5"}, {"lightness": 21}]}, {"featureType": "poi.park", "elementType": "geometry", "stylers": [{"color": "#dedede"}, {"lightness": 21}]}, {"elementType": "labels.text.stroke", "stylers": [{"visibility": "on"}, {"color": "#ffffff"}, {"lightness": 16}]}, {"elementType": "labels.text.fill", "stylers": [{"saturation": 36}, {"color": "#333333"}, {"lightness": 40}]}, {"elementType": "labels.icon", "stylers": [{"visibility": "off"}]}, {"featureType": "transit", "elementType": "geometry", "stylers": [{"color": "#f2f2f2"}, {"lightness": 19}]}, {"featureType": "administrative", "elementType": "geometry.fill", "stylers": [{"color": "#fefefe"}, {"lightness": 20}]}, {"featureType": "administrative", "elementType": "geometry.stroke", "stylers": [{"color": "#fefefe"}, {"lightness": 17}, {"weight": 1.2}]}]
// 	});

// 	const marker = new google.maps.Marker({
// 		position: centerPnt,
// 		map: map,
// 		icon : 'images/marker.png'
// 	});
// }

// export { map }




//Map Box
//tutaj uzywa sie tak, ze zaklada sie konto u nich (darmowe)
//wchodzi sie na strone https://www.mapbox.com/install/js/ i przechodzi przez kroki
//potem wystarczy wpisac w necie mapbox theme i pobrac jakis styl
function map() {
	mapboxgl.accessToken = 'pk.eyJ1Ijoia2FydG9mZWxlazAwNyIsImEiOiJjamtub3p1ZmUyaDl4M3ZtemFuN2RqcG80In0.ma3wK3iZCvKl2_0WjcLAOg';
    var map = new mapboxgl.Map({
        container: 'mainMap',
        style: "mapbox://styles/mapbox/light-v9",
        zoom:13.7,
        center: [20.99995,52.23277]
    });

    map.on("load", function () {
      /* Image: An image is loaded and added to the map. */
      map.loadImage("images/marker.png", function(error, image) {
          if (error) throw error;
          map.addImage("custom-marker", image);
          /* Style layer: A style layer ties together the source and image and specifies how they are displayed on the map. */
          map.addLayer({
            id: "markers",
            type: "symbol",
            /* Source: A data source specifies the geographic coordinate where the image marker gets placed. */
            source: {
              type: "geojson",
              data: {
                type: "FeatureCollection",
                features:[{"type":"Feature","geometry":{"type":"Point","coordinates":[21.000184708360422,52.23315625157048]}}]}
            },
            layout: {
              "icon-image": "custom-marker",
            }
          });
        });
    });
}

export { map }






