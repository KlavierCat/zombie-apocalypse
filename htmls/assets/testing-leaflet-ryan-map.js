var map = L.map('map',{maxZoom:20}).setView([53.3437,-6.2528],15);
var imageUrl = ''

//Initiate map object and enable user dragging and zooming
var zombieLayer = '../htmls/images/map.jpg';
var imageBounds = [[53.345684,-6.259525],[53.341879,-6.249504]];
L.imageOverlay(zombieLayer, imageBounds).addTo(map);
map.setMaxBounds(imageBounds);
