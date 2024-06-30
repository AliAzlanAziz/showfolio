import Joi from '@hapi/joi';
import { Request, Response, NextFunction } from 'express';

const userForgetPasswordSchema = Joi.object({
    email: Joi.string().trim().email().required(),
})

export const userForgetPasswordValidator = (req: Request, res: Response, next: NextFunction) => {
    const { error } = userForgetPasswordSchema.validate(req.body.user, { abortEarly: false });

    if (error) {
        return res.status(400).json({
            success: false,
            message: error.details.map(detail => detail.message)
        });
    }

    next();
};
