import { Request, Response } from 'express';
import * as rideService from './ride.service';

export const create = async (req: Request, res: Response) => {
  const result = await rideService.create(req.body);
  return res.send(result);
};

export const list = async (req: Request, res: Response) => {
  const result = await rideService.list(req.query);
  console.log(result);

  return res.send(result);
};

export const getById = async (req: Request, res: Response) => {
  const result = await rideService.getById(req.params.id);
  return res.send(result);
};
