import Joi from '@hapi/joi';
import { Request, Response, NextFunction } from 'express';

const awardCreateUpdateSchema = Joi.object({
    id: Joi.string().optional(),
    title: Joi.string().trim().min(1).max(256).required(),
    desc: Joi.string().trim().min(1).max(512).required(),
    year: Joi.number().min(1800).max(9999).optional().allow(null, ''),
    uploadingImage: Joi.boolean().optional().allow(null),
    base64Image: Joi.string().optional().allow(null, ''),
});

export const awardCreateUpdateValidator = (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = awardCreateUpdateSchema.validate(req.body.award, { abortEarly: true });
    
    req.body.award = value

    if (error) {
        return res.status(400).json({
            success: false,
            message: error.details.map(detail => detail.message),
        });
    }

    next();
};
