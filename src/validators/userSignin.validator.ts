import Joi from '@hapi/joi';
import { Request, Response, NextFunction } from 'express';

const userSigninSchema = Joi.object({
    email: Joi.string().trim().email().optional(),
    username: Joi.string().trim().min(4).max(128).optional(),
    password: Joi.string().trim().required()
}).or('email', 'username').messages({
    'object.missing': 'Either email or username must be present'
});

export const userSigninValidator = (req: Request, res: Response, next: NextFunction) => {
    const { error } = userSigninSchema.validate(req.body.user, { abortEarly: false });

    if (error) {
        return res.status(400).json({
            success: false,
            message: error.details.map(detail => detail.message)
        });
    }

    next();
};
