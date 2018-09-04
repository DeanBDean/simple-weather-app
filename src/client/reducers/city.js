import { fromJS } from 'immutable';
import { get } from 'lodash';
import { types } from '../actions/city';

export function city(state = fromJS({
  id: null,
  name: null,
  coord: {
    lon: null,
    lat: null
  },
  country: null,
  population: null
}), action) {
  switch (action.type) {
    case types.SET_CITY:
      return state.merge(fromJS({
        id: action.id,
        name: action.name,
        coord: {
          lon: get(action, 'coord.lon'),
          lat: get(action, 'coord.lat')
        },
        country: action.country,
        population: action.population
      }));
    default:
      return state;
  }
}
