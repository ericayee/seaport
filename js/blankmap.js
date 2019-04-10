L.mapbox.accessToken = 'pk.eyJ1IjoiZXJpY2F5ZWUiLCJhIjoiY2p0ZzhtaWdyMW02ODRibXVjenJwcHJzaiJ9.vIk_KKg89-GGHhbQtc5SCQ';

var mapboxTiles = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/{z}/{x}/{y}?access_token=' + L.mapbox.accessToken, {
  attribution: '© <a href="https://www.mapbox.com/feedback/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
});

var map = L.map('map')
.addLayer(mapboxTiles)
.setView([42.361577,-71.078420], 13);

map.zoomControl.remove();
map.doubleClickZoom.disable();
map.scrollWheelZoom.disable();
