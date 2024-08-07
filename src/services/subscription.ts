import { Response } from 'express';
import { ContextModel } from '../models/context.model';
import { SubscriptionType, isMonthly, isNone, isSubscribed, isYearly } from '../enums/subscriptionType.enum';
import { SubscriptionModel } from '../models/subscription.model';
import * as dotenv from 'dotenv';
import Stripe from 'stripe';
import { getCurrentUTCTime } from '../helper/utils';
import { SubscriptionReasonType } from '../enums/subscriptionReason.enum';
import { serviceLogger } from '../config/logger';

const logger = serviceLogger('service:subscription.js')

dotenv.config({ path: __dirname + './../config/config.env' })

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '')

const CreatePaymentIntents = async (subscription: SubscriptionModel, context: ContextModel, res: Response) => {
  try {
    if(isSubscribed(context.user.subsType)){
      return res.status(400).json({
        success: false,
        message: 'You can only after your current subscription ends!'
      })
    }

    const amount = calculateSubscriptionAmount(subscription.subsType);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100,
      currency: 'usd',
      metadata: {
        userId: context.user._id.toString(),
        subscriptionType: subscription.subsType.toString(),
        time: getCurrentUTCTime().toUTCString(),
        reason: SubscriptionReasonType.FULL_ACCESS_SUBSCRIPTION.toString(),
      }
    });

    return res.status(200).send({
      success: true,
      paymentIntent: paymentIntent.client_secret,
    });
  } catch (error: any) {
    logger.error(error?.raw?.message);
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

const calculateSubscriptionAmount = (subsType: SubscriptionType) => {
  const packages = returnPackages()
  
  if(isMonthly(subsType)){
    return packages[0].amount - (packages[0].amount*packages[0].discount/100);
  }else if(isYearly(subsType)){
    return packages[1].amount - (packages[1].amount*packages[1].discount/100);
  }else{
    throw Error('Payment intents can only be created for monthly or yearly subsType subscription payments!');
  }
}

const returnPackages = () => {
  const packages = [
    {
      label: 'Monthly',
      text: 'Pay as you go!',
      subsType: SubscriptionType.MONTHLY,
      amount: 15,
      discount: 20
    },
    {
      label: 'Annually',
      text: 'Save 20% on annual subscription!',
      subsType: SubscriptionType.YEARLY,
      amount: 150,
      discount: 20
    }
  ]

  return packages;
}

export default {
  CreatePaymentIntents,
  Packages
}