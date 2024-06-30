import Joi from '@hapi/joi';
import { Request, Response, NextFunction } from 'express';

const awardCreateUpdateSchema = Joi.object({
    title: Joi.string().trim().min(1).max(256).required(),
    desc: Joi.string().trim().min(1).max(512).required(),
    year: Joi.string().trim().regex(/^[1-9]\d{3}$/).optional(),
    uploadingImage: Joi.boolean().optional(),
    base64Image: Joi.string().when('uploadingImage', {
        is: true,
        then: Joi.string().required(),
        otherwise: Joi.optional()
    })
});

export const awardCreateUpdateValidator = (req: Request, res: Response, next: NextFunction) => {
    const { error } = awardCreateUpdateSchema.validate(req.body.award, { abortEarly: false });

    if (error) {
        return res.status(400).json({
            success: false,
            message: error.details.map(detail => detail.message),
        });
    }

    next();
};
