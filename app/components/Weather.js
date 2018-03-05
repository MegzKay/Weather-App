var React = require('react');



class Weather extends React.Component{
	constructor(props)
	{
		super(props);
		this.getWindDirection = this.getWindDirection.bind(this);
		this.uCase = this.uCase.bind(this);
		this.meterPerSecToKMPerHR = this.meterPerSecToKMPerHR.bind(this);
		this.fullUrl = this.fullUrl.bind(this);
	}

	getWindDirection(deg)
	{
		var dir = "N";
		/*https://uni.edu/storm/Wind%20Direction%20slide.pdf*/
		//North is (deg >= 0 && deg <= 19) || (deg >= 350 && deg <= 360) 

		if(deg >= 20 && deg <= 39)
		{
			dir = "N/NE";
		}
		else if(deg >= 40 && deg <= 59)
		{
			dir = "NE";
		}
		else if(deg >= 60 && deg <= 79)
		{
			dir = "E/NE";
		}
		else if(deg >= 80 && deg <= 109)
		{
			dir = "E";
		}
		else if(deg >= 110 && deg <= 129)
		{
			dir = "E/SE";
		}
		else if(deg >= 130 && deg <= 149)
		{
			dir = "SE";
		}
		else if(deg >= 150 && deg <= 169)
		{
			dir = "S/SE";
		}
		else if(deg >= 170 && deg <= 199)
		{
			dir = "S";
		}
		else if(deg >= 200 && deg <= 219)
		{
			dir="S/SW";
		}
		else if(deg >= 220 && deg <= 239)
		{
			dir = "SW";
		}
		else if(deg >= 240 && deg <= 159)
		{
			dir = "W/SW";
		}
		else if(deg >= 260 && deg <= 289)
		{
			dir = "W";
		}
		else if(deg >= 290 && deg <= 309)
		{
			dir = "W/NW";
		}
		else if(deg >= 310 && deg <= 329)
		{
			dir = "NW";
		}
		else if(deg >= 330 && deg <= 349)
		{
			dir = "N/NW";
		}
		
		return dir;
	}
	uCase(word)
	{
		var words = word.split(" ");
		for(var i = 0 ; i < words.length;i++)
		{
			words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1); 
		}
		return words.join(" ");
	}
	meterPerSecToKMPerHR(speed)
	{
		return Math.round(speed*3.6);
	}
	fullUrl(imgName)
	{
		return 'http://openweathermap.org/img/w/'+imgName+'.png';
	}
	render()
	{
		
		return(
			<div id="weather">
				<h1>{this.props.weatherData.name}</h1>
				<h3 id="temp">Current Temperature: {this.props.weatherData.main.temp}&#8451;</h3>
				<div id="weather_cond_img">
					<p id="weather_cond">{this.uCase(this.props.weatherData.weather[0].description)}</p>
					<img 
						id="weather_img" 
						src={this.fullUrl(this.props.weatherData.weather[0].icon)}
						alt={this.props.weatherData.weather[0].description}
					/>
				</div>
				<p id="wind">Winds are currently {this.meterPerSecToKMPerHR(this.props.weatherData.wind.speed)} {this.getWindDirection(this.props.weatherData.wind.deg)}</p>
			</div>

		);
	}
}

module.exports = Weather;