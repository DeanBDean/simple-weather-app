import moment from 'moment';
import { get } from 'lodash';
import {
  __,
  always,
  both,
  cond,
  either,
  gte,
  lte
} from 'ramda';
import uuid from 'uuid/v4';

export const types = {
  SET_DAILY_WEATHER: `${APP_NAME}_SET_DAILY_WEATHER`,
  SET_OPEN_DAILY_WEATHER_LIST_ITEM: `${APP_NAME}_SET_OPEN_DAILY_WEATHER_LIST_ITEM`,
  CLOSE_DAILY_WEATHER_LIST_ITEM: `${APP_NAME}_CLOSE_DAILY_WEATHER_LIST_ITME`
};

export const setWeather = weather => ({
  id: weather.id,
  main: weather.main,
  description: weather.description,
  icon: weather.icon
});

export const DIRECTIONS = {
  east: 'East',
  northeast: 'Northeast',
  north: 'North',
  northwest: 'Northwest',
  west: 'West',
  southwest: 'Southwest',
  south: 'South',
  southeast: 'Southeast'
};

export const isBetweenXAndY = (x, y) => both(gte(__, x), lte(__, y));
export const isPointingEast = either(gte(__, 342.5), lte(__, 22.5));
export const isPointingNortheast = isBetweenXAndY(22.5, 67.5);
export const isPointingNorth = isBetweenXAndY(67.5, 112.5);
export const isPointingNorthwest = isBetweenXAndY(112.5, 157.5);
export const isPointingWest = isBetweenXAndY(157.5, 202.5);
export const isPointingSouthwest = isBetweenXAndY(202.5, 247.5);
export const isPointingSouth = isBetweenXAndY(247.5, 292.5);
export const isPointingSoutheast = isBetweenXAndY(292.5, 342.5);

export const findDirectionFromDegrees = cond([
  [isPointingEast, always(DIRECTIONS.east)],
  [isPointingNortheast, always(DIRECTIONS.northeast)],
  [isPointingNorth, always(DIRECTIONS.north)],
  [isPointingNorthwest, always(DIRECTIONS.northwest)],
  [isPointingWest, always(DIRECTIONS.west)],
  [isPointingSouthwest, always(DIRECTIONS.southwest)],
  [isPointingSouth, always(DIRECTIONS.south)],
  [isPointingSoutheast, always(DIRECTIONS.southeast)]
]);

export const setDailyWeather = (dailyWeatherArray, unitsTypes) => ({
  type: types.SET_DAILY_WEATHER,
  dailyWeather: dailyWeatherArray.map(dailyWeather => ({
    id: uuid(),
    datetime: moment.unix(dailyWeather.dt),
    temp: {
      day: get(dailyWeather, 'temp.day'),
      min: get(dailyWeather, 'temp.min'),
      max: get(dailyWeather, 'temp.max'),
      night: get(dailyWeather, 'temp.night'),
      eve: get(dailyWeather, 'temp.eve'),
      morn: get(dailyWeather, 'temp.morn'),
      units: unitsTypes.temp,
      unitsShort: unitsTypes.tempShort
    },
    pressure: {
      value: dailyWeather.pressure,
      units: unitsTypes.pressure,
      unitsShort: unitsTypes.pressureShort
    },
    humidity: {
      value: dailyWeather.humidity,
      units: unitsTypes.humidity
    },
    weather: setWeather(get(dailyWeather, 'weather.0', {})),
    windspeed: {
      value: dailyWeather.speed,
      units: unitsTypes.windspeed,
      unitsShort: unitsTypes.windspeedShort,
      degrees: dailyWeather.deg,
      direction: findDirectionFromDegrees(dailyWeather.deg)
    },
    clouds: dailyWeather.clouds
  }))
});

export const setDailyWeatherListItem = listItemIndex => ({
  type: types.SET_OPEN_DAILY_WEATHER_LIST_ITEM,
  openListItemIndex: listItemIndex
});

export const closeDailyWeatherListItem = () => ({
  type: types.CLOSE_DAILY_WEATHER_LIST_ITEM
});
