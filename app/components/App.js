var React = require('react');
var Weather = require('./Weather');
var Map = require('./Map');

class App extends React.Component{
	constructor(props)
	{
		super(props);
		this.state = {
			weatherData: null,
			latlng: null
		};
		

		this.getDataFromLatLng = this.getDataFromLatLng.bind(this);
		this.showPosition = this.showPosition.bind(this);
		this.updateWeatherData = this.updateWeatherData.bind(this);
		this.updateLatLng = this.updateLatLng.bind(this);

	}
	componentDidMount()
	{
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(this.showPosition, function(error){
				this.getDataFromLatLng(-25.363, 131.044);
			}.bind(this));

		} else {
			this.getDataFromLatLng(-25.363, 131.044);
		}
	}
	showPosition(position)
	{
		this.getDataFromLatLng(position.coords.latitude, position.coords.longitude);
		this.updateLatLng(position.coords.latitude, position.coords.longitude);
	}
	getDataFromLatLng(lat, lng)
	{
		$.ajax({
			url: 'http://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+lng+"&units=metric&appid=KEY_HERE",
			type:"GET",
			dataType:"jsonp",
			success:this.updateWeatherData,

			error: function(xhr, status, error) {
			  console.log(xhr.responseText + " " + status, " " + error);
			}
		});
	}
	updateWeatherData (results)
	{
		this.setState({
			weatherData:results
		});
	}
	updateLatLng(lat, lng)
	{
		this.setState({
			latlng: {lat:lat,lng:lng}
		});
	}
	render()
	{

		return(
			
			<div id="container">
				
				{this.state.weatherData != null
					? <Weather weatherData={this.state.weatherData}/>
					: <p>Loading...</p>
				}
				{this.state.latlng != null
					? <Map latlng={this.state.latlng} getDataFromLatLng={this.getDataFromLatLng}/>
					: <p>Loading...</p>
				}
				
			</div>
		);
	}
}

module.exports = App;
