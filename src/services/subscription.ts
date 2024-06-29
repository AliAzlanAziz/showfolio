import { Request, Response } from 'express';
import { ContextModel } from '../models/context.model';
import { SubscriptionType, isMonthly, isNone, isSubscribed, isYearly } from '../enums/subscriptionType.enum';
import { SubscriptionModel } from '../models/subscription.model';
import * as dotenv from 'dotenv';
import Stripe from 'stripe';

dotenv.config({ path: __dirname + './../config/config.env' })

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '')

const CreatePaymentIntents = async (subscription: SubscriptionModel, context: ContextModel, res: Response) => {
  try {
    if(isSubscribed(context.user.subsType)){
      return res.status(409).json({
        success: false,
        message: 'You can only after your current subscription ends!'
      })
    }

    const amount = calculateSubscriptionAmount(subscription.type);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100,
      currency: "usd",
      metadata: {
        userId: context.user._id.toString(),
        subscriptionType: subscription.type.toString(),
        time: (new Date()).toUTCString(),
        amount: `${amount}`
      },
      automatic_payment_methods: { enabled: true }
    });

    return res.status(200).send({
      success: true,
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error: any) {
    console.log(error?.raw?.message)
    return res.status(500).json({
      success: false,
      message: 'Error creating payment intents!',
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
  Packages
}