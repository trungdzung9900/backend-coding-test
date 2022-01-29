import loggerUtil from './utils/logger.util';
import rideRouter from './api/ride/ride.route';
import { Application, Request, Response } from 'express';

module.exports = (db, app: Application) => {
  app.get('/health', (req: Request, res: Response) => {
    res.send('Healthy');
    loggerUtil.info('Server Sent A Hello World!');
  });

  app.use('/', [rideRouter]);

  return app;
};
