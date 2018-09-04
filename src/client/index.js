import React from 'react';
import { render } from 'react-dom';
import { configureStore } from './store/configureStore';
import { AppComponent } from './rootApp';

const store = configureStore();

render(<AppComponent store={store} />, document.getElementById('app'));
