import Joi from '@hapi/joi';
import { Request, Response, NextFunction } from 'express';

const userResetPasswordCodeSchema = Joi.object({
    email: Joi.string().trim().email().required(),
    code: Joi.string().trim().length(6).regex(/^\d{6}$/).required()
});

export const userResetPasswordCodeValidator = (req: Request, res: Response, next: NextFunction) => {
    const { error } = userResetPasswordCodeSchema.validate(req.body.user, { abortEarly: false });

    if (error) {
        return res.status(400).json({
            success: false,
            message: error.details.map(detail => detail.message)
        });
    }

    next();
};
