import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { List, Map } from 'immutable';
import { closeDailyWeatherListItem as closeDailyWeatherListItemAction, setDailyWeatherListItem as setDailyWeatherListItemAction } from '../actions/dailyWeather';
import { getDailyWeather as getDailyWeatherAction } from '../actions/xhrRequests';
import { DailyWeatherComponent } from '../components/dailyWeather';

export class DailyWeather extends Component {
  constructor(props) {
    super(props);
    this.onListItemClick = this.onListItemClick.bind(this);
  }

  componentDidMount() {
    const { cityInput, getDailyWeather } = this.props;
    getDailyWeather(cityInput, DEFAULT_UNITS);
  }

  onListItemClick(listItemIndex) {
    return () => {
      const { closeDailyWeatherListItem, openListItemIndex, setDailyWeatherListItem } = this.props;
      if (openListItemIndex === listItemIndex) {
        closeDailyWeatherListItem();
      } else {
        setDailyWeatherListItem(listItemIndex);
      }
    };
  }

  render() {
    const { city, dailyWeather, openListItemIndex } = this.props;

    return (
      <DailyWeatherComponent
        city={city}
        dailyWeather={dailyWeather}
        onListItemClick={this.onListItemClick}
        openListItemIndex={openListItemIndex}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    city: state.city,
    dailyWeather: state.dailyWeather.get('dailyWeather'),
    openListItemIndex: state.dailyWeather.get('openListItemIndex')
  };
}

function mapDispatcherToProps(dispatch) {
  return {
    closeDailyWeatherListItem: () => dispatch(closeDailyWeatherListItemAction()),
    getDailyWeather: (city, units) => dispatch(getDailyWeatherAction(city, units)),
    setDailyWeatherListItem: listItemIndex => dispatch(setDailyWeatherListItemAction(listItemIndex))
  };
}

DailyWeather.propTypes = {
  closeDailyWeatherListItem: PropTypes.func.isRequired,
  city: PropTypes.instanceOf(Map).isRequired,
  cityInput: PropTypes.string.isRequired,
  dailyWeather: PropTypes.oneOfType([PropTypes.instanceOf(List), PropTypes.instanceOf(Map)]).isRequired,
  getDailyWeather: PropTypes.func.isRequired,
  openListItemIndex: PropTypes.number.isRequired,
  setDailyWeatherListItem: PropTypes.func.isRequired
};

export const DailyWeatherContainer = connect(mapStateToProps, mapDispatcherToProps)(DailyWeather);
