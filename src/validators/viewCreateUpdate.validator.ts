import Joi from '@hapi/joi';
import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';

const viewCreateUpdateSchema = Joi.object({
    to: Joi.string().custom((value, helpers) => {
        if (!mongoose.Types.ObjectId.isValid(value)) {
            return helpers.error('any.invalid');
        }
        return value;
    }).required()
}).messages({
    'any.invalid': 'Invalid Mongoose ObjectId'
});

export const viewCreateUpdateValidator = (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = viewCreateUpdateSchema.validate(req.body.view, { abortEarly: true });

    req.body.view = value

    if (error) {
        return res.status(400).json({
            success: false,
            message: error.details.map(detail => detail.message)
        });
    }

    next();
};
