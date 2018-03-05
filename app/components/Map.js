var React = require('react');


class Map extends React.Component{

	constructor(props)
	{
		super(props);
		this.initMap = this.initMap.bind(this);
		this.draggedMarker = this.draggedMarker.bind(this);
		
	}
	componentDidMount()
	{
		this.initMap(this.props.latlng);
	}
	initMap(latlng)
	{
		var map = new google.maps.Map(document.getElementById('map'), {
			zoom: 10,
			center: latlng
		});
		var marker = new google.maps.Marker({
			position: latlng,
			map: map,
			draggable: true,
		});
		

		marker.addListener('dragend', this.draggedMarker);
		
	}

	draggedMarker(event) 
	{
		this.initMap(event.latLng);
		this.props.getDataFromLatLng(event.latLng.lat(), event.latLng.lng());
	}
	render()
	{
		return(
			<div id="map">
				The Google Map goes here. If you see this message then something went wrong.
			</div>

		);
	}
}

module.exports = Map;