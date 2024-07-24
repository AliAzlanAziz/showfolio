import Joi from '@hapi/joi';
import { Request, Response, NextFunction } from 'express';

const userSigninSchema = Joi.object({
    email: Joi.string().lowercase().trim().email().optional().allow(null, ''),
    username: Joi.string().lowercase().trim().min(4).max(128).optional().allow(null, ''),
    password: Joi.string().required()
}).or('email', 'username').messages({
    'object.missing': 'Either email or username must be present'
});

export const userSigninValidator = (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = userSigninSchema.validate(req.body.user, { abortEarly: true });
    
    req.body.user = value

    if (error) {
        return res.status(400).json({
            success: false,
            message: error.details.map(detail => detail.message)
        });
    }

    next();
};
