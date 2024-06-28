import { Request, Response, NextFunction } from 'express';
import stripeService from '../services/stripe';

const postWebhook = (req: Request, res: Response) => {
  return stripeService.Webhook(req, res)
}

export default {
  postWebhook
}