import axios from 'axios';
import { get } from 'lodash';
import { setCity } from './city';
import { setDailyWeather } from './dailyWeather';

export const types = {
  GET_DAILY_WEATHER_START: `${APP_NAME}_XHR_REQUESTS_GET_DAILY_WEATHER_START`,
  GET_DAILY_WEATHER_COMPLETE: `${APP_NAME}_XHR_REQUESTS_GET_DAILY_WEATHER_END`
};

export const getDailyWeatherStart = () => ({
  type: types.GET_DAILY_WEATHER_START
});

export const getDailyWeatherComplete = (cityData, dailyWeatherData, unitsTypes) => (dispatch) => {
  dispatch(setCity(cityData));
  dispatch(setDailyWeather(dailyWeatherData, unitsTypes));
};

export const unitsMap = {
  imperial: {
    humidity: '%',
    pressure: 'hectopascal',
    pressureShort: 'hPa',
    temp: 'Fahrenheit',
    tempShort: '°F',
    windspeed: 'miles per hour',
    windspeedShort: 'mph'
  }
};

export const getDailyWeather = (city = DEFAULT_CITY, units = DEFAULT_UNITS) => async (dispatch) => {
  dispatch(getDailyWeatherStart());
  try {
    const dailyWeatherResults = await axios.get('/api/weather/daily', {
      params: {
        city,
        units
      }
    });
    const resultsArray = [
      get(dailyWeatherResults, 'data.data.city'),
      get(dailyWeatherResults, 'data.data.list'),
      unitsMap[units]
    ];
    dispatch(getDailyWeatherComplete(...resultsArray));

    return Promise.resolve(...resultsArray);
  } catch (error) {
    getDailyWeatherComplete({}, {}, {});

    return Promise.reject(error);
  }
};
