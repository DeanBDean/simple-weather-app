import React from 'react';
import { get } from 'lodash';
import { Redirect, Route, Switch } from 'react-router-dom';
import { DailyWeatherContainer } from './dailyWeather';

export const RedirectToDailyWeather = () => (
  <Redirect to={`/${DEFAULT_CITY}/weather/daily`} />
);

export const ComponentFor404 = () => (
  <div>Could not find this page</div>
);

export const App = () => (
  <Switch>
    <Route
      path="/:city/weather/daily"
      exact
      render={props => (
        <React.StrictMode>
          <DailyWeatherContainer city={get(props, 'match.params.city')} />
        </React.StrictMode>
      )
      }
    />
    <Route path="/" exact component={RedirectToDailyWeather} />
    <Route component={ComponentFor404} />
  </Switch>
);

export const AppContainer = App;
