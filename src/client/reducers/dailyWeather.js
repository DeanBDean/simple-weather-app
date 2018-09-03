import { fromJS } from 'immutable';
import { types } from '../actions/dailyWeather';

export function dailyWeather(state = fromJS({
  dailyWeather: []
}), action) {
  switch (action.type) {
    case types.SET_DAILY_WEATHER:
      return state.merge(fromJS({
        dailyWeather: action.dailyWeather
      }));
    default:
      return state;
  }
}
