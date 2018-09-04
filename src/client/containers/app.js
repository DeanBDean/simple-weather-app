import React from 'react';
import { get } from 'lodash';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Redirect, Route, Switch } from 'react-router-dom';
import { DailyWeatherContainer } from './dailyWeather';
import 'typeface-roboto';

export const RedirectToDailyWeather = () => (
  <Redirect to={`/${DEFAULT_CITY}/weather/daily`} />
);

export const ComponentFor404 = () => (
  <div>Could not find this page</div>
);

export const App = () => (
  <>
    <CssBaseline />
    <Switch>
      <Route
        path="/:city/weather/daily"
        exact
        render={props => (
          <React.StrictMode>
            <DailyWeatherContainer cityInput={get(props, 'match.params.city')} />
          </React.StrictMode>
        )
        }
      />
      <Route path="/" exact component={RedirectToDailyWeather} />
      <Route component={ComponentFor404} />
    </Switch>
  </>
);

export const AppContainer = App;
