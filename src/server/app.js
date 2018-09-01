import express from 'express';
import helmet from 'helmet';
import compression from 'compression';
import bodyParser from 'body-parser';
import history from 'connect-history-api-fallback';
import fs from 'fs';
import path from 'path';
import api from './api';
import { value as config } from '../config';

export const app = express();

app.use(helmet());
app.use(compression());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use('/api', api);
// redirects to index for error messaging if invalid path has file extension
app.use(history({
  rewrites: [{
    from: /(.+)\.(.+)/g,
    to: (context) => {
      const match = context.match[0];

      if (match.split('.').length === 0 || fs.existsSync(path.resolve(__dirname, 'public/').replace('/server', '') + match)) {
        return match;
      }
      return '/index.html';
    }
  }]
}));
app.use(express.static('public/'));
