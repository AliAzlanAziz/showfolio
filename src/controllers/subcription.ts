import { Request, Response, NextFunction } from 'express';
import subscriptionService from '../services/subscription';

const postPaymentIntents = (req: Request, res: Response) => {
  return subscriptionService.CreatePaymentIntents(req.body.subscription, req.context, res)
}

const getPackages = (req: Request, res: Response) => {
  return subscriptionService.Packages(res)
}

const postWebhook = (req: Request, res: Response) => {
  return subscriptionService.Webhook(req, res)
}

export default {
  postPaymentIntents,
  getPackages,
  postWebhook
}