import React from 'react';
import { render } from 'react-dom';
import { hot } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from './store/configureStore';
import { AppContainer } from './containers/app';

const store = configureStore();

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <AppContainer />
    </BrowserRouter>
  </Provider>
);

const AppComponent = NODE_ENV === 'development' ? hot(module)(App) : App;

render(<AppComponent />, document.getElementById('app'));
