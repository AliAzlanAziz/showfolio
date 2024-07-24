import Joi from '@hapi/joi';
import { Request, Response, NextFunction } from 'express';
import { SubscriptionType } from '../enums/subscriptionType.enum';

const subsPayIntentCreateSchema = Joi.object({
    subsType: Joi.number().valid(SubscriptionType.MONTHLY, SubscriptionType.YEARLY).required()
})

export const subsPayIntentCreateValidator = (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = subsPayIntentCreateSchema.validate(req.body.subscription, { abortEarly: true });

    req.body.subscription = value

    if (error) {
        return res.status(400).json({
            success: false,
            message: error.details.map(detail => detail.message)
        });
    }

    next();
};