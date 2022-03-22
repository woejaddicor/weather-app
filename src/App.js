import './App.css';
import React, { useState, useEffect } from 'react';
import { getWeatherData } from './api/OpenWeather';
import { ScaleLoader } from 'react-spinners';

function App() {
	const [weatherdata, setWeatherData] = useState(null);
	const [city, setCity] = useState('Manchester');
	const [loading, setLoading] = useState(false);
	const [time, setTime] = useState(new Date().toLocaleString());

	useEffect(() => {
		getData();
	}, []);

	console.log(time);

	const getData = async () => {
		try {
			setLoading(true);
			const data = await getWeatherData(city);
			setWeatherData(data);
			setLoading(false);
		} catch (error) {
			console.log(error.message);
			setLoading(false);
		}
	};

	return (
		<div className="App">
			<div className="weather-container">
				<h2 className="title">Weather App</h2>
				<div className="search-form">
					<input
						type="text"
						value={city}
						onChange={(e) => setCity(e.target.value)}
						placeholder="Search for weather in your area"
						onKeyPress={(e) => {
							if (e.key === 'Enter') {
								e.preventDefault();
								getData();
							}
						}}
					/>
					<button type="button" onClick={() => getData()}>
						Search
					</button>
				</div>
				{loading ? (
					<div className="loader-container">
						<ScaleLoader size={200} color={'white'} loading={loading} />
					</div>
				) : (
					<>
						{weatherdata !== null ? (
							<div className="main-container">
								<h4>Live Weather:</h4>
								<div className="animation-container">
									<div className="weather-icon">
										<img
											src={`http://openweathermap.org/img/w/${weatherdata.weather[0].icon}.png`}
											alt="imgicon"
										/>
										<img
											src={`http://openweathermap.org/img/w/${weatherdata.weather[0].icon}.png`}
											alt="imgicon"
										/>
										<img
											src={`http://openweathermap.org/img/w/${weatherdata.weather[0].icon}.png`}
											alt="imgicon"
										/>
									</div>
								</div>
								<div className="date-container">
									<p className="date-info">
										{time.slice(0, 10)} -//- {time.slice(12)}
									</p>
								</div>
								<h3 className="weather-description">
									{weatherdata.weather[0].description}
								</h3>
								<div></div>
								<div className="temperature">
									<h1>
										{parseFloat(weatherdata.main.temp - 273.15).toFixed(1)}°C
									</h1>
								</div>
								<div className="location">
									<h3>
										{weatherdata.name} | {weatherdata.sys.country}
									</h3>
								</div>
								<div className="temperature-range">
									<h6>
										Min:{' '}
										{parseFloat(weatherdata.main.temp_min - 273.15).toFixed(1)}
										&deg;C -- Max:{' '}
										{parseFloat(weatherdata.main.temp_max - 273.15).toFixed(1)}
										&deg;C -- Humidity: {weatherdata.main.humidity}%
									</h6>
								</div>
							</div>
						) : null}
					</>
				)}
			</div>
		</div>
	);
}

export default App;
