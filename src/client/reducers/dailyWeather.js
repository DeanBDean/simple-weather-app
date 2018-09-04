import { fromJS } from 'immutable';
import { types } from '../actions/dailyWeather';

export function dailyWeather(state = fromJS({
  openListItemIndex: -1,
  dailyWeather: []
}), action) {
  switch (action.type) {
    case types.SET_DAILY_WEATHER:
      return state.merge(fromJS({
        dailyWeather: action.dailyWeather
      }));
    case types.SET_OPEN_DAILY_WEATHER_LIST_ITEM:
      return state.merge(fromJS({
        openListItemIndex: action.openListItemIndex
      }));
    case types.CLOSE_DAILY_WEATHER_LIST_ITEM:
      return state.merge(fromJS({
        openListItemIndex: -1
      }));
    default:
      return state;
  }
}
