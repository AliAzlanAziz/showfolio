import { Request, Response } from 'express';
import { ContextModel } from '../models/context.model';
import Subscription from '../schema/subscription';
import { Types } from 'mongoose';
import * as dotenv from 'dotenv';
import Stripe from 'stripe';

dotenv.config({ path: __dirname + './../config/config.env' })

const stripe = new Stripe(process.env.STRIPE_WEBHOOK_SECRET_KEY || '')

const Webhook = async (req: Request, res: Response) => {
  try{
    const signature = req.headers['stripe-signature'] as string;
    console.log('req.body')
    console.log(req.body)
    const event = stripe.webhooks.constructEvent(req.body, signature, process.env.STRIPE_WEBHOOK_SECRET_KEY || '');

    switch (event.type) {
      case 'payment_intent.succeeded':
        // console.log('here in payment_intent.succeeded')
        // const paymentIntentSuccess = event.data.object;
        // console.log(paymentIntentSuccess)
        break;
      case 'payment_intent.payment_failed':
        // console.log('here in payment_intent.payment_failed')
        // const paymentIntentFailed = event.data.object;
        // console.log(paymentIntentFailed)
        break;
      default:
        // console.log(`Unhandled event type ${event.type}`);
    }

    return res.status(200).send({
      success: true,
      message: 'Successfully handled webhook!',
    });
  }catch(error){
    console.log(`Webhook Error: ${error}`);
    return res.status(400).json({
      error: error
    });
  }
}

const handlePaymentIntentSuccess = async (context: ContextModel, paymentInfo: any) => {
// const handlePaymentIntentSuccess = async (context: ContextModel, paymentInfo: {userId: string, subscriptionType: number, time: string}) => {
  const newSubscription = new Subscription({
    _id: new Types.ObjectId(),
    user: paymentInfo.userId,
    type: paymentInfo.subscriptionType,
    time: paymentInfo.time,
    amount: paymentInfo.amount
  })

  await newSubscription.save();
}

export default {
  Webhook
}