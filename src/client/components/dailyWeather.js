import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { round } from 'lodash';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CircularProgress from '@material-ui/core/CircularProgress';
import Collapse from '@material-ui/core/Collapse';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
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

const typographyDisplaySize = 'headline';

export const DailyWeatherComponent = ({ dailyWeather, onListItemClick, openListItemIndex }) => (
  <div className={styles.container}>
    <Paper className={classnames(styles.paperContainer, { [styles.container]: dailyWeather.isEmpty() })}>
      {
        !dailyWeather.isEmpty()
          ? (
            <List component="nav">
              {
                dailyWeather.entrySeq().map(([index, weatherDay]) => (
                  <div key={weatherDay.get('id')}>
                    <ListItem button divider onClick={onListItemClick(index)}>
                      <Avatar alt="" src={iconMap[weatherDay.getIn(['weather', 'icon'])]} />
                      <ListItemText primaryTypographyProps={{ variant: typographyDisplaySize }}>
                        <div>{findDayOfTheWeek(index, weatherDay.get('datetime'))}</div>
                        <div className={styles.smallerFont}>{weatherDay.getIn(['weather', 'main'])}</div>
                      </ListItemText>
                      <ListItemSecondaryAction>
                        <Typography variant={typographyDisplaySize}>
                          <div>{`${round(weatherDay.getIn(['temp', 'max']))}${weatherDay.getIn(['temp', 'unitsShort'])}`}</div>
                          <div className={styles.smallerFont}>{`${round(weatherDay.getIn(['temp', 'min']))}${weatherDay.getIn(['temp', 'unitsShort'])}`}</div>
                        </Typography>
                      </ListItemSecondaryAction>
                    </ListItem>
                    <Collapse in={index === openListItemIndex}>
                      <Card className={styles.card}>
                        <CardContent className={styles.cardContent}>
                          <Typography variant="headline">
                            <div className={styles.cardContentTypography}>{`Morning Temperature: ${round(weatherDay.getIn(['temp', 'morn']))}${weatherDay.getIn(['temp', 'unitsShort'])}`}</div>
                            <div className={styles.cardContentTypography}>{`Daytime Temperature: ${round(weatherDay.getIn(['temp', 'day']))}${weatherDay.getIn(['temp', 'unitsShort'])}`}</div>
                            <div className={styles.cardContentTypography}>{`Evening Temperature: ${round(weatherDay.getIn(['temp', 'eve']))}${weatherDay.getIn(['temp', 'unitsShort'])}`}</div>
                            <div className={styles.cardContentTypography}>{`Nighttime Temperature: ${round(weatherDay.getIn(['temp', 'night']))}${weatherDay.getIn(['temp', 'unitsShort'])}`}</div>
                            <div className={styles.cardContentTypography}>{`Humidity: ${round(weatherDay.getIn(['humidity', 'value']))}${weatherDay.getIn(['humidity', 'units'])}`}</div>
                            <div className={styles.cardContentTypography}>{`Pressure: ${round(weatherDay.getIn(['pressure', 'value']))}${weatherDay.getIn(['pressure', 'unitsShort'])}`}</div>
                            <div className={styles.cardContentTypography}>{`Wind: ${round(weatherDay.getIn(['windspeed', 'value']))}${weatherDay.getIn(['windspeed', 'unitsShort'])} to the ${weatherDay.getIn(['windspeed', 'direction'])}`}</div>
                          </Typography>
                        </CardContent>
                        <CardMedia className={styles.cardMedia} image={iconMap[weatherDay.getIn(['weather', 'icon'])]} />
                      </Card>
                    </Collapse>
                  </div>
                ))
              }
            </List>
          )
          : <CircularProgress size={150} />
      }
    </Paper>
  </div>
);

DailyWeatherComponent.propTypes = {
  dailyWeather: PropTypes.instanceOf(ImmutableList).isRequired,
  onListItemClick: PropTypes.func.isRequired,
  openListItemIndex: PropTypes.number.isRequired
};
