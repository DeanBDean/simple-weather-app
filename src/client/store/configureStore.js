import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger'; // eslint-disable-line import/no-extraneous-dependencies
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'; // eslint-disable-line import/no-extraneous-dependencies
import { isFunction, mapValues } from 'lodash';
import { reducers } from '../reducers';

function transformImmutableToJS(state) {
  return mapValues(state, (value) => {
    if (isFunction(value.calendar)) {
      return value.format();
    }
    if (!isFunction(value.toJS)) {
      return transformImmutableToJS(value);
    }
    return value.toJS();
  });
}

const loggerMiddleware = createLogger({
  collapsed: true,
  stateTransformer: state => transformImmutableToJS(state)
});

export function configureStore(preloadedState) {
  if (NODE_ENV !== 'production') {
    return createStore(
      reducers,
      preloadedState,
      composeWithDevTools(
        applyMiddleware(
          thunkMiddleware,
          loggerMiddleware
        )
      )
    );
  }
  return createStore(
    reducers,
    preloadedState,
    composeWithDevTools(
      applyMiddleware(
        thunkMiddleware
      )
    )
  );
}
