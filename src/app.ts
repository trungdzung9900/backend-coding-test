import bodyParser from 'body-parser';
import express, { Request, Response } from 'express';
import buildSchemas, { db } from './schemas';
import loggerUtil from './utils/logger.util';
import rideRouter from './api/ride/ride.route';

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

db.serialize(() => {
  buildSchemas(db);
  console.log(`Database has connected`);
});

app.get('/health', (req: Request, res: Response) => {
  res.send('Healthy');
  loggerUtil.info('Server Sent A Hello World!');
});

app.use('/', [rideRouter]);

module.exports = app;
