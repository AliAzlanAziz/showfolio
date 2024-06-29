import { Request, Response } from 'express';
import Stripe from 'stripe';

const stripe = new Stripe(process?.env?.STRIPE_WEBHOOK_SECRET_KEY || '');

const Webhook = async (req: Request, res: Response) => {
  try{
    const sig = req.headers['stripe-signature'] as string;
    const event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET_KEY || '');
    console.log("after event parsed")

    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntentSuccess = event.data.object;
        console.log('PaymentIntent was successful!', paymentIntentSuccess);
        break;
      case 'payment_intent.payment_failed':
        const paymentIntentFailed = event.data.object;
        console.log('PaymentIntent failed.', paymentIntentFailed);
        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    return res.status(200).send({
      success: true,
      message: 'Successfully handled webhook!',
    });
  }catch(error){
    console.log(`Error while handling request to webhook ${error}`);
    return res.status(400).json({
      error: error
    });
  }
}

export default {
  Webhook
}