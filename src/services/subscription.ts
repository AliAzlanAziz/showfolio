import { Request, Response } from 'express';
import { ContextModel } from '../models/context.model';
import { SubscriptionType, isMonthly, isNone, isYearly } from '../enums/subscriptionType.enum';
import { SubscriptionModel } from '../models/subscription.model';
import Stripe from 'stripe';

const stripe = new Stripe(process?.env?.STRIPE_SECRET_KEY || '');

const CreatePaymentIntents = async (subscription: SubscriptionModel, context: ContextModel, res: Response) => {
  try {
    const amount = calculateSubscriptionAmount(subscription.type);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "usd",
      metadata: {
        userId: context.user._id,
        subscriptionType: subscription.type,
        date: (new Date()).toUTCString()
      },
      automatic_payment_methods: { enabled: true }
    });

    return res.status(200).send({
      success: true,
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error creating view!',
    });
  }
};

const Packages = (res: Response) => {
  const packages = returnPackages()

  return res.status(200).json({
    success: true,
    data: packages
  })
}

const Webhook = async (req: Request, res: Response) => {
  try{
    const sig = req.headers['stripe-signature'] as string;
    const event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_SECRET_KEY || '');

    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object;
        console.log('PaymentIntent was successful!', paymentIntent);
        break;
      case 'payment_intent.payment_failed':
        const paymentFailedIntent = event.data.object;
        console.log('PaymentIntent failed.', paymentFailedIntent);
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

const calculateSubscriptionAmount = (type: SubscriptionType) => {
  const packages = returnPackages()
  
  if(isMonthly(type)){
    return packages.monthly.amount;
  }else if(isYearly(type)){
    return packages.yearly.amount;
  }else{
    throw Error('Payment intents can only be created for monthly or yearly type subscription payments!');
  }
}

const returnPackages = () => {
  const packages = {
    monthly: {
      text: 'Pay as you go!',
      type: SubscriptionType.MONTHLY,
      amount: 10
    },
    yearly: {
      text: 'Save 33% on annual subscription!',
      type: SubscriptionType.YEARLY,
      amount: 80
    }
  }

  return packages;
}

export default {
  CreatePaymentIntents,
  Packages,
  Webhook
}