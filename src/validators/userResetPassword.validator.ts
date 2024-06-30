import Joi from '@hapi/joi';
import { Request, Response, NextFunction } from 'express';

const userResetPasswordSchema = Joi.object({
    email: Joi.string().trim().email().required(),
    code: Joi.string().trim().length(6).regex(/^\d{6}$/).required(),
    password: Joi.string().trim().required(),
    confirmPassword: Joi.string().trim().required().valid(Joi.ref('password')).messages({
        'any.only': 'Passwords do not match'
    })
});

export const userResetPasswordValidator = (req: Request, res: Response, next: NextFunction) => {
    const { error } = userResetPasswordSchema.validate(req.body.user, { abortEarly: false });

    if (error) {
        return res.status(400).json({
            success: false,
            message: error.details.map(detail => detail.message)
        });
    }

    next();
};
