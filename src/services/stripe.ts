import { Request, Response } from 'express';
import { ContextModel } from '../models/context.model';
import Subscription from '../schema/subscription';
import { Types } from 'mongoose';
import * as dotenv from 'dotenv';
import Stripe from 'stripe';
import User from '../schema/user';
import { serviceLogger } from '../config/logger';

const logger = serviceLogger('service:stripe.js')

dotenv.config({ path: __dirname + './../config/config.env' })

const stripe = new Stripe(process.env.STRIPE_WEBHOOK_SECRET_KEY || '')

const Webhook = async (req: Request, res: Response) => {
  try{
    const signature = req.headers['stripe-signature'] as string;
    const reqBody = req.body.toString();
    const body = JSON.parse(reqBody);

    const event = stripe.webhooks.constructEvent(reqBody, signature, process.env.STRIPE_WEBHOOK_SECRET_KEY || '');    

    switch (event.type) {
      case 'payment_intent.succeeded':
        logger.info('payment_intent.succeeded')
        await handlePaymentIntentSuccess(body.data.object.metadata, body.data.object.amount)
        break;
      case 'payment_intent.payment_failed':
        logger.info('payment_intent.payment_failed')
        break;
      default:
        logger.info(`Unhandled event type ${event.type}`);
    }

    return res.status(200).send({
      success: true,
      message: 'Successfully handled webhook!',
    });
  }catch(error){
    logger.error(error);
    return res.status(400).json({
      error: error
    });
  }
}

const handlePaymentIntentSuccess = async (metadata: any, amount: number) => {
  try{
    const newSubscription = new Subscription({
      _id: new Types.ObjectId(),
      user: metadata.userId,
      type: metadata.subscriptionType,
      time: metadata.time,
      amount: amount,
      reason: metadata.reason
    })

    await newSubscription.save();

    await User.findByIdAndUpdate(metadata.userId, {subsType: metadata.subscriptionType});
  } catch(error) {
    logger.error(error)
  }

}

export default {
  Webhook
}