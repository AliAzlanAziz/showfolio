import { Request, Response } from 'express';
import subscriptionService from '../services/subscription';

const postPaymentIntents = (req: Request, res: Response) => {
  return subscriptionService.CreatePaymentIntents(req.body.subscription, req.context, res)
}

const getPackages = (req: Request, res: Response) => {
  return subscriptionService.Packages(res)
}

export default {
  postPaymentIntents,
  getPackages
}