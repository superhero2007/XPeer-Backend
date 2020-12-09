import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';

import router from './routes';
import fallback from 'express-history-api-fallback';
const helmet = require('helmet');

const app = express();

app.disable('etag');
app.disable('x-powered-by');

app.use(helmet());

app.use(bodyParser.json());
app.use(morgan('tiny'));
app.use(express.static(`${__dirname}/public`));
const root = `${__dirname}/public`;

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'HEAD, OPTIONS, GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});

app.use('/api/v1', router);
app.use(fallback('index.html', { root }));
app.use('*', (req, res) => {
  console.log('ROUTE NOT FOUND');
  res.sendStatus(400);
});

export default app;
