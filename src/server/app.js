import express from 'express';
import helmet from 'helmet';
import compression from 'compression';
import bodyParser from 'body-parser';
import history from 'connect-history-api-fallback';
import fs from 'fs';
import { join, resolve } from 'path';
import { api } from './api';
import { value as config } from '../config';
// import { value as config } from '../config';

export const app = express();

app.use(helmet());
app.use(compression());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api', api);


if (config.NODE_ENV === 'development') {
  const webpack = require('webpack'); // eslint-disable-line import/no-extraneous-dependencies, global-require
  const webpackDevMiddleware = require('webpack-dev-middleware'); // eslint-disable-line import/no-extraneous-dependencies, global-require
  const webpackHotMiddleware = require('webpack-hot-middleware'); // eslint-disable-line import/no-extraneous-dependencies, global-require
  const webpackConfig = require('../../webpack.config.babel'); // eslint-disable-line global-require
  const compiler = webpack(webpackConfig);
  app.use([
    webpackDevMiddleware(compiler, {
      publicPath: webpackConfig.output.publicPath,
      hot: true,
      quiet: false,
      noInfo: false,
      lazy: false,
      stats: {
        colors: true
      }
    }),
    webpackHotMiddleware(compiler)
  ]);
  app.get('*', (req, res, next) => {
    const filename = join(compiler.outputPath, 'index.html');
    compiler.outputFileSystem.readFile(filename, (err, result) => { // eslint-disable-line consistent-return
      if (err) {
        return next(err);
      }
      res.set('content-type', 'text/html');
      res.send(result);
      res.end();
    });
  });
}

app.use(history({
  rewrites: [{
    from: /(.+)\.(.+)/g,
    to: (context) => {
      const match = context.match[0];

      if (match.split('.').length === 0 || fs.existsSync(resolve(__dirname, `../..${match}`))) {
        return match;
      }
      return '/index.html';
    }
  }]
}));

// redirects to index for error messaging if invalid path has file extension
app.use(express.static('dist/assets'));
