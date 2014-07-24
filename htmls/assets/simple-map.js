//Initiate map object and enable user dragging and zooming
var map = new L.Map('map',{
//	zoomControl:false
});

//Disable zoom and drag handlers
//map.dragging.disable();
//map.touchZoom.disable();
//map.doubleClickZoom.disable();
//map.scrollWheelZoom.disable();

// Disable tap handler, if present.
//if (map.tap) map.tap.disable();

//Prepare the background tile layer
var zombieLayer = new L.TileLayer('http://{s}.tiles.mapbox.com/v3/klaviercat.ilg78chl/{z}/{x}/{y}.png');

//Set the centre of the map
var center = new L.LatLng(53.3437, -6.253);
map.setView(center, 17);

//Load the background tiles
map.addLayer(zombieLayer);
