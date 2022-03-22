import axios from 'axios';

const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?';
const apiKey = '823d5b99caa16b265a3587c6595f95a0';

export const getWeatherData = async (cityName) => {
	try {
		const { data } = await axios.get(baseUrl + `q=${cityName}&appid=${apiKey}`);
		return data;
	} catch (error) {
		throw error;
	}
};
