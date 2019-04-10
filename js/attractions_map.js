L.mapbox.accessToken = 'pk.eyJ1IjoiZXJpY2F5ZWUiLCJhIjoiY2p0ZzhtaWdyMW02ODRibXVjenJwcHJzaiJ9.vIk_KKg89-GGHhbQtc5SCQ';

var mapboxTiles = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/{z}/{x}/{y}?access_token=' + L.mapbox.accessToken, {
  attribution: '© <a href="https://www.mapbox.com/feedback/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
});

var map = L.map('attractionsMap')
.addLayer(mapboxTiles)
.setView([42.351563, -71.043975], 15);

// create custom icon
var pointer = L.icon({
  iconUrl: 'media/location_vector.png',
  iconSize: [30, 30],
  popupAnchor: [-15,0]
});

// specify popup options
var customOptions =
{
  'minWidth': '225',
  'className' : 'custom',
}

// create marker object, pass custom icon as option, pass content and options to popup, add to map
L.marker([42.353245, -71.042964], {icon: pointer}).bindPopup("Institute of Contemporary Art<br/><img src='media/ica.jpg' alt='ICA' width='200px'/>",customOptions).addTo(map);
L.marker([42.344494, -71.044987], {icon: pointer}).bindPopup("The Lawn on D<br/><img src='media/lawnond.jpg' alt='Lawn on D' width='200px'/>",customOptions).addTo(map);
L.marker([42.345493, -71.046382], {icon: pointer}).bindPopup("Boston Convention and Exhibition Center<br/><img src='media/bcec.jpg' alt='ICA' width='200px'/>",customOptions).addTo(map);
L.marker([42.351892, -71.049982], {icon: pointer}).bindPopup( "Boston Children's Museum<br/><img src='https://upload.wikimedia.org/wikipedia/commons/7/71/Boston_Children%27s_Museum.jpg' alt='ICA' width='200px'/>",customOptions).addTo(map);

map.scrollWheelZoom.disable();
