import { combineReducers } from 'redux';
import { city } from './city';
import { dailyWeather } from './dailyWeather';

export const reducers = combineReducers({
  city,
  dailyWeather
});
