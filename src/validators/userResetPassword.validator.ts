import Joi from '@hapi/joi';
import { Request, Response, NextFunction } from 'express';

const userResetPasswordSchema = Joi.object({
    token: Joi.string().trim().length(12).regex(/^\d{12}$/).required(),
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
