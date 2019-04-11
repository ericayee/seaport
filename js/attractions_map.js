L.mapbox.accessToken = 'pk.eyJ1IjoiZXJpY2F5ZWUiLCJhIjoiY2p0ZzhtaWdyMW02ODRibXVjenJwcHJzaiJ9.vIk_KKg89-GGHhbQtc5SCQ';

var mapboxTilesAttr = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/{z}/{x}/{y}?access_token=' + L.mapbox.accessToken, {
  attribution: '© <a href="https://www.mapbox.com/feedback/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
});

var aMap = L.map('attractionsMap')
.addLayer(mapboxTilesAttr)
.setView([42.351563, -71.043975], 15);

// create custom icon
var pointer = L.icon({
  iconUrl: './media/location_vector.png',
  iconSize: [40, 40],
  popupAnchor: [-15,0]
});

// specify popup options
var customOptions =
{
  'minWidth': '225',
  'className' : 'custom',
}

// create marker object, pass custom icon as option, pass content and options to popup, add to map
L.marker([42.353245, -71.042964], {icon: pointer}).bindPopup("Institute of Contemporary Art<br/><img src='./media/ica.jpg' alt='ICA' width='200px'/>",customOptions).addTo(aMap);
L.marker([42.344494, -71.044987], {icon: pointer}).bindPopup("The Lawn on D<br/><img src='./media/lawnond.jpg' alt='Lawn on D' width='200px'/>",customOptions).addTo(aMap);
L.marker([42.345493, -71.046382], {icon: pointer}).bindPopup("Boston Convention and Exhibition Center<br/><img src='./media/bcec.jpg' alt='ICA' width='200px'/>",customOptions).addTo(aMap);
L.marker([42.351892, -71.049982], {icon: pointer}).bindPopup( "Boston Children's Museum<br/><img src='https://upload.wikimedia.org/wikipedia/commons/7/71/Boston_Children%27s_Museum.jpg' alt='ICA' width='200px'/></br>Credit: <a target=\'_blank\' href=\'https://commons.wikimedia.org/wiki/File:Boston_Children%27s_Museum.jpg\'>Tim Pierce</a>",customOptions).addTo(aMap);

//L.control.layers(mapboxTilesAttr, null).addTo(aMap);

aMap.scrollWheelZoom.disable();

var instructions = L.control({position: 'topright'});

instructions.onAdd = function (aMap) {
  var div = L.DomUtil.create('div', 'leaflet-bar');
  div.innerHTML = '<h4>Click a pin to see an attraction.</h4>';
  return div;
};

instructions.addTo(aMap);
