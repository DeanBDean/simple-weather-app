import { get } from 'lodash';

export const types = {
  SET_CITY: `${APP_NAME}_SET_CITY`
};

export const setCity = cityData => ({
  type: types.SET_CITY,
  id: cityData.id,
  name: cityData.name,
  coord: {
    lon: get(cityData, 'coord.lon'),
    lat: get(cityData, 'coord.lat')
  },
  country: cityData.country,
  population: cityData.population
});
