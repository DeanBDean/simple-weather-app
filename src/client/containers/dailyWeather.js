import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { List, Map } from 'immutable';
import { getDailyWeather as getDailyWeatherAction } from '../actions/xhrRequests';
import { DailyWeatherComponent } from '../components/dailyWeather';

export class DailyWeather extends Component {
  componentDidMount() {
    const { cityInput, getDailyWeather } = this.props;
    getDailyWeather(cityInput, DEFAULT_UNITS);
  }

  render() {
    const { city, dailyWeather } = this.props;

    return (
      <DailyWeatherComponent
        city={city}
        dailyWeather={dailyWeather}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    city: state.city,
    dailyWeather: state.dailyWeather.get('dailyWeather')
  };
}

function mapDispatcherToProps(dispatch) {
  return {
    getDailyWeather: (city, units) => dispatch(getDailyWeatherAction(city, units))
  };
}

DailyWeather.propTypes = {
  city: PropTypes.instanceOf(Map).isRequired,
  cityInput: PropTypes.string.isRequired,
  dailyWeather: PropTypes.oneOfType([PropTypes.instanceOf(List), PropTypes.instanceOf(Map)]).isRequired,
  getDailyWeather: PropTypes.func.isRequired
};

export const DailyWeatherContainer = connect(mapStateToProps, mapDispatcherToProps)(DailyWeather);
