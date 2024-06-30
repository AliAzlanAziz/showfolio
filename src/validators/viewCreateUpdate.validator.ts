import Joi from '@hapi/joi';
import { Request, Response, NextFunction } from 'express';

const viewCreateUpdateSchema = Joi.object({
    to: Joi.string().trim().required(),
})

export const viewCreateUpdateValidator = (req: Request, res: Response, next: NextFunction) => {
    const { error } = viewCreateUpdateSchema.validate(req.body.view, { abortEarly: false });

    if (error) {
        return res.status(400).json({
            success: false,
            message: error.details.map(detail => detail.message)
        });
    }

    next();
};
