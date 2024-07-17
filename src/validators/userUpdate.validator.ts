import Joi from '@hapi/joi';
import { Request, Response, NextFunction } from 'express';

const userUpdateSchema = Joi.object({
    position: Joi.string().trim().min(3).max(128).optional(),
    phone: Joi.string().trim().regex(/^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/).min(9).max(128).optional(),
    desc: Joi.string().trim().min(1).max(512).optional(),
    // fb: Joi.string().trim().regex(/https:\/\/[a-z]{2,3}\.facebook\.com\/.*/).min(18).max(256).optional(),
    // ig: Joi.string().trim().regex(/https:\/\/[a-z]{2,3}\.instagram\.com\/.*/).min(18).max(256).optional(),
    // yt: Joi.string().trim().regex(/https:\/\/[a-z]{2,3}\.youtube\.com\/.*/).min(18).max(256).optional(),
    // gh: Joi.string().trim().regex(/https:\/\/[a-z]{2,3}\.github\.com\/.*/).min(18).max(256).optional(),
    // tw: Joi.string().trim().regex(/https:\/\/[a-z]{2,3}\.twitter\.com\/.*/).min(18).max(256).optional(),
    // li: Joi.string().trim().regex(/https:\/\/[a-z]{2,3}\.linkedin\.com\/.*/).min(18).max(256).optional(),
    // web: Joi.string().trim().min(4).max(256).optional(),
    address: Joi.object({
        city: Joi.string().trim().min(1).max(128).optional(),
        country: Joi.string().trim().min(1).max(128).optional(),
        details: Joi.string().trim().min(1).max(256).optional()
    }).optional(),
    languages: Joi.array().items(
        Joi.object({
            name: Joi.string().trim().min(1).max(128).optional(),
            skillLevel: Joi.number().valid(1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5).optional()
        })
    ).optional(),
    toWork: Joi.boolean().optional(),
    toHire: Joi.boolean().optional(),
    gender: Joi.string().valid('M','F','N').optional(),
    uploadingImage: Joi.boolean().optional(),
    base64Image: Joi.string().when('uploadingImage', {
        is: true,
        then: Joi.string().required(),
        otherwise: Joi.optional()
    }),
});

export const userUpdateValidator = (req: Request, res: Response, next: NextFunction) => {
    const { error } = userUpdateSchema.validate(req.body.user, { abortEarly: false });

    if (error) {
        return res.status(400).json({
            success: false,
            message: error.details.map(detail => detail.message)
        });
    }

    next();
};
