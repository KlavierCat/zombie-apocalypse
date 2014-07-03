var map = L.mapbox.map('map', 'klaviercat.ilgaaoeg',{
  zoomControl: false
}).setView([53.3437, -6.253],16);
  
//Disable zoom and drag handlers
map.dragging.disable();
map.touchZoom.disable();
map.doubleClickZoom.disable();
map.scrollWheelZoom.disable();

// Disable tap handler, if present.
if (map.tap) map.tap.disable();
	
	