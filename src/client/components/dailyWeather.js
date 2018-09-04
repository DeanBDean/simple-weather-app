import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import CircularProgress from '@material-ui/core/CircularProgress';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import { List as ImmutableList } from 'immutable';
import styles from '../styles/dailyWeather'; // eslint-disable-line import/no-unresolved
import ArtClearPNG from '../assets/art_clear.png';
import ICCLearPNG from '../assets/ic_clear.png';
import ArtLightCloudsPNG from '../assets/art_light_clouds.png';
import ICLightCloudsPNG from '../assets/ic_light_clouds.png';
import ArtCloudsPNG from '../assets/art_clouds.png';
import ICCloudyPNG from '../assets/ic_cloudy.png';
import ArtLightRainPNG from '../assets/art_light_rain.png';
import ICLightRainPNG from '../assets/ic_light_rain.png';
import ArtRainPNG from '../assets/art_rain.png';
import ICRainPNG from '../assets/ic_rain.png';
import ArtStormPNG from '../assets/art_storm.png';
import ICStormPNG from '../assets/ic_storm.png';
import ArtSnowPNG from '../assets/art_snow.png';
import ICSNowPNG from '../assets/ic_snow.png';
import ArtFogPNG from '../assets/art_fog.png';
import ICFogPNG from '../assets/ic_fog.png';

const iconMap = {
  '01d': ArtClearPNG,
  '01n': ICCLearPNG,
  '02d': ArtLightCloudsPNG,
  '02n': ICLightCloudsPNG,
  '03d': ArtCloudsPNG,
  '03n': ICCloudyPNG,
  '04d': ArtCloudsPNG,
  '04n': ICCloudyPNG,
  '09d': ArtLightRainPNG,
  '09n': ICLightRainPNG,
  '10d': ArtRainPNG,
  '10n': ICRainPNG,
  '11d': ArtStormPNG,
  '11n': ICStormPNG,
  '13d': ArtSnowPNG,
  '13n': ICSNowPNG,
  '50d': ArtFogPNG,
  '50n': ICFogPNG
};

export const findDayOfTheWeek = (index, moment) => {
  if (index === 0) {
    return 'Today';
  }
  if (index === 1) {
    return 'Tomorrow';
  }

  return moment.format('dddd');
};

export const DailyWeatherComponent = ({ dailyWeather }) => (
  <Paper className={styles.paperContainer}>
    {
      dailyWeather
        ? (
          <List>
            {
              dailyWeather.entrySeq().map(([index, weatherDay]) => (
                <ListItem key={weatherDay.get('id')}>
                  <Avatar alt="" src={iconMap[weatherDay.getIn(['weather', 'icon'])]} />
                  <ListItemText>
                    <div>{findDayOfTheWeek(index, weatherDay.get('datetime'))}</div>
                    <div>{weatherDay.getIn(['weather', 'main'])}</div>
                  </ListItemText>
                </ListItem>
              ))
            }
          </List>
        )
        : <CircularProgress size={75} />
    }
  </Paper>
);

DailyWeatherComponent.propTypes = {
  dailyWeather: PropTypes.instanceOf(ImmutableList).isRequired
};
