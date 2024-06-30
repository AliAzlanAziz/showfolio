import Joi from '@hapi/joi';
import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';

const awardDeleteSchema = Joi.object({
    id: Joi.string().custom((value, helpers) => {
        if (!mongoose.Types.ObjectId.isValid(value)) {
            return helpers.error('any.invalid');
        }
        return value;
    }).required()
}).messages({
    'any.invalid': 'Invalid Mongoose ObjectId'
});

export const awardDeleteValidator = (req: Request, res: Response, next: NextFunction) => {
    const { error } = awardDeleteSchema.validate(req.params, { abortEarly: false });

    if (error) {
        return res.status(400).json({
            success: false,
            message: error.details.map(detail => detail.message),
        });
    }

    next();
};
