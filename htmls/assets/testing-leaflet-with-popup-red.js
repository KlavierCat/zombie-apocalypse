//Initiate map object and enable user dragging and zooming
var map = new L.Map('map',{
	zoomControl:false
});

//Disable zoom and drag handlers, leaves dragging function;
//map.dragging.disable();
map.touchZoom.disable();
map.doubleClickZoom.disable();
//map.scrollWheelZoom.disable();

// Disable tap handler, if present.
if (map.tap) map.tap.disable();

//Prepare the background tile layer
var zombieLayer = new L.TileLayer('http://{s}.tiles.mapbox.com/v3/klaviercat.ilh01oim/{z}/{x}/{y}.png');

//Set the centre of the map
var center = new L.LatLng(53.3437,-6.2528);
map.setView(center,17);
//map.fitBounds([
//	[53.345812,-6.259741],
//	[53.341713,-6.245847]
//]);
window.addEventListener('resize', function(event){
	var width=document.documentElement.clientWidth;
	if (width < 1200){
		map.setZoom(16);
	} else {
		map.setZoom(17);
	}
});


//Load the background tiles
map.addLayer(zombieLayer);

//Create an empty layer to load the polygon
var featureLayer = new L.GeoJSON();

//set a default style for the polygon to appear
var defaultStyle = {
	color:"#9F595E",//7B3136
	weight:1.5,
	opacity:1,
	fillColor:"#9F595E",//63B0BA
	fillOpacity:0.7
};

//to create a highlight style for mouse over effect
var highlightStyle = {
	color:"#D90000",//#95D1DA
	weight:1.5,
	opacity:1,
	fillColor:"#D90000",
	fillOpacity:0.8
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
		});
		//create a mouseover event that undoes the mouseover changes
		layer.on("mouseout",function(e){
			//start by reverting the style back
			layer.setStyle(defaultStyle);
			//and then destroying the popup
			$("#popup-"+properties.ID).remove();
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

//Add the layer to the map
map.addLayer(featureLayer);