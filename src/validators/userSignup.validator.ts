import Joi from '@hapi/joi';
import { Request, Response, NextFunction } from 'express';

const userSignupSchema = Joi.object({
    name: Joi.string().trim().min(4).max(128).required(),
    email: Joi.string().trim().email().required(),
    username: Joi.string().trim().min(4).max(128).required(),
    password: Joi.string().min(8).max(20).required(),
    confirmPassword: Joi.string().required().valid(Joi.ref('password')).messages({
        'any.only': 'Passwords do not match'
    })
}).custom((obj, helpers) => {
    const username: String = obj.username
    if (username && (username.indexOf(' ') != -1)) {
        return helpers.message({ custom: 'username must not contain any whitespaces' });
    }
    return obj;
});

export const userSignupValidator = (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = userSignupSchema.validate(req.body.user, { abortEarly: true });
    
    req.body.user = value

    if (error) {
        return res.status(400).json({
            success: false,
            message: error.details.map(detail => detail.message)
        });
    }

    next();
};
