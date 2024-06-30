import Joi from '@hapi/joi';
import { Request, Response, NextFunction } from 'express';

const userSignupSchema = Joi.object({
    name: Joi.string().trim().min(4).max(128).required(),
    email: Joi.string().trim().email().required(),
    username: Joi.string().trim().min(4).max(128).required(),
    password: Joi.string().required(),
    confirmPassword: Joi.string().required().valid(Joi.ref('password')).messages({
        'any.only': 'Passwords do not match'
    })
});

export const userSignupValidator = (req: Request, res: Response, next: NextFunction) => {
    const { error } = userSignupSchema.validate(req.body.user, { abortEarly: false });

    if (error) {
        return res.status(400).json({
            success: false,
            message: error.details.map(detail => detail.message)
        });
    }

    next();
};
