import { Router } from 'express';
import * as rideController from './ride.controller';

const router = Router();

router.get('/rides', rideController.list);

router.post('/rides', rideController.create);

router.get('/rides/:id', rideController.getById);

export default router;
