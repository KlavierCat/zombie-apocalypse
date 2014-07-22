
		var map = L.map('map', {maxZoom: 18}).setView([51.495, -0.075], 14);
		/* Instead of a tile layer, use a bitmap image */
		var imageUrl = 'http://scss.tcd.ie/~plin/zombie/images/map-medium.jpg';
		var imageBounds = [[51.490, -0.130], [51.526, -0.030]];
		L.imageOverlay(imageUrl, imageBounds).addTo(map);
		L.marker([51.495, -0.075]).addTo(map)
			.bindPopup("This is TZD map.");
		var popup = L.popup();
		function onMapClick(e) {
			popup
				.setLatLng(e.latlng)
				.setContent("You clicked the map at " + e.latlng.toString())
				.openOn(map);
		}
		map.on('click', onMapClick);
		map.setMaxBounds(imageBounds);
	
