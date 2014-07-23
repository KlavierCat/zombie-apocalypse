//Initiate map object and enable user dragging and zooming
var map = new L.Map('map',{
	zoomControl:false
});

//Disable zoom handlers, disable dragging function;
map.dragging.disable();
map.touchZoom.disable();
map.doubleClickZoom.disable();
map.scrollWheelZoom.disable();

// Disable tap handler, if present.
if (map.tap) map.tap.disable();

//Prepare the background tile layer
var zombieLayer = new L.TileLayer('http://{s}.tiles.mapbox.com/v3/klaviercat.ilh01oim/{z}/{x}/{y}.png');

//Set the centre of the map
//var center = new L.LatLng(53.343794,-6.25439);
//map.setView(center,17);
map.fitBounds([
	[53.34189,-6.259525],
	[53.345484,-6.249404]
]);

var imageUrl='https://www.scss.tcd.ie/~plin/zombie/images/map-big-new-black.jpg',
//	imageBounds = [[53.34589,-6.26171],[53.34167,-6.24707]]; northWest, southEast
	imageBounds = [[53.346836,-6.262141],[53.340691,-6.247056]]; //northWest, southEast
	
//imageBounds = imageBounds.extend([[,],[,]])
	
L.imageOverlay(imageUrl,imageBounds).addTo(map);


window.addEventListener('resize', function(event){
	var width=document.documentElement.clientWidth;	
	if (width < 640){
		map.setZoom(16);
		map.dragging.enable();
//	} else if (width > 1281){
//		map.setZoom(17.3);
//	} else if (width > 1010) {
//		map.setZoom(17);
//	} else if (width>600) {
//		map.setZoom(16);
//	} else {
//		map.setZoom(15);
//	}
};
});

//map.setZoom(17.5);

//set icon for markers
var redIcon = L.icon({
	iconUrl:'images/marker.png',
	iconSize:[20,20],
	iconAnchor:[10,10]
//popupAnchor:
})
//location [53.34258,-6.25125]
//location:[53.34228,-6.25141]
//L.marker([x,y],{icon:redIcon}).addTo(map);

//Load the background tiles
map.addLayer(zombieLayer);

//Create an empty layer to load the polygon
var featureLayer = new L.GeoJSON();

//set a default style for the polygon to appear
var defaultStyle = {
	color:"#95D1DA",//63B0BA
	weight:1.5,
	opacity:1,
	fillColor:"#95D1DA",//63B0BA
	fillOpacity:0.7
};

//to create a highlight style for mouse over effect
var highlightStyle = {
	color:"#D90000",
	weight:1.5,
	opacity:1,
	fillColor:"#D90000",
	fillOpacity:0.7
}

//Define what happens to each polygon just before it is loaded onto the map, 
//as well as if they are moused over
var onEachFeature = function(feature, layer) {
	//loading the default style on them
	layer.setStyle(defaultStyle);
	//create a self-invoking function that passes in the layer
	//and the properties associates with this particular record.
	(function(layer, properties){
	//create a mouseover event
		layer.on("mouseover",function(e){
			//change the style to the highlighted style
			layer.setStyle(highlightStyle);
			//create a popup with a unique ID linked to this record
			var popup = $("<div></div>", {
				id:"popup-" + properties.ID,
				class:"popup-map",
			});
			//insert a headline into that popup
			var hed = $("<div></div>",{
				text:properties.BUILDING,
			}).appendTo(popup);
			//add the popup to the map
			popup.appendTo("#map");
			//onclick event
			layer.on("click",function(e){
				map.fitBounds(e.target.getBounds());
//				map.panTo(e.latlng);
//				map.setZoom(18);
//				map.on('zoomned', function(e){
//					map.panTo(e,latlng);
//				});
				map.removeLayer(featureLayer);
				$("#popup-"+properties.ID).remove();

//Todo: the marker should be loaded via GeoJson!
				//location [53.34258,-6.25125]
				//location:[53.34228,-6.25141]
				L.marker([53.34258,-6.25125],{icon:redIcon}).addTo(map).bindPopup();
				L.marker([53.34228,-6.25141],{icon:redIcon}).addTo(map).bindPopup();	
//might be useful in the future:
//				map.addLayer(marker);
//				map.removeLayer(marker);
//Todo: add a back-button which will send the user back to the original setting/map if clicked, and suicide once the original setting/map is achieved.
			});
		});
		//create a mouseover event that undoes the mouseover changes
		layer.on("mouseout",function(e){
			//start by reverting the style back
			layer.setStyle(defaultStyle);
			//and then destroying the popup
			$("#popup-"+properties.ID).remove();
			//map.panTo(center);
		});

		//close the "anonymous" wrapper function, and call it while passing
		// in the variables necessary to make the events work the way we want.
	})(layer, feature.properties);
};

//Add the GeoJSON to the layer, which is loaded in the <head>
var featureLayer = L.geoJson(boundaries, {
	//linked up the function to run when loading each feature
	onEachFeature: onEachFeature
});

//for testing
		var popup = L.popup();
		function onMapClick(e) {
			popup
				.setLatLng(e.latlng)
				.setContent("You clicked the map at " + e.latlng.toString())
				.openOn(map);
		}
		map.on('click', onMapClick);
//end of for testing

//Add the layer to the map
map.addLayer(featureLayer);