import Joi from '@hapi/joi';
import { Request, Response, NextFunction } from 'express';

const userUpdateSchema = Joi.object({
    position: Joi.string().trim().min(3).max(128).optional().allow(null, ''),
    phone: Joi.string().trim().regex(/^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/).min(9).max(128).optional().allow(null, ''),
    desc: Joi.string().trim().max(512).optional().allow(null, ''),
    fb: Joi.string().trim().max(256).optional().allow(null, ''),
    ig: Joi.string().trim().max(256).optional().allow(null, ''),
    yt: Joi.string().trim().max(256).optional().allow(null, ''),
    gh: Joi.string().trim().max(256).optional().allow(null, ''),
    tw: Joi.string().trim().max(256).optional().allow(null, ''),
    li: Joi.string().trim().max(256).optional().allow(null, ''),
    // fb: Joi.string().trim().regex(/https:\/\/[a-z]{2,3}\.facebook\.com\/.*/).min(18).max(256).optional().allow(null, ''),
    // ig: Joi.string().trim().regex(/https:\/\/[a-z]{2,3}\.instagram\.com\/.*/).min(18).max(256).optional().allow(null, ''),
    // yt: Joi.string().trim().regex(/https:\/\/[a-z]{2,3}\.youtube\.com\/.*/).min(18).max(256).optional().allow(null, ''),
    // gh: Joi.string().trim().regex(/https:\/\/[a-z]{2,3}\.github\.com\/.*/).min(18).max(256).optional().allow(null, ''),
    // tw: Joi.string().trim().regex(/https:\/\/[a-z]{2,3}\.twitter\.com\/.*/).min(18).max(256).optional().allow(null, ''),
    // li: Joi.string().trim().regex(/https:\/\/[a-z]{2,3}\.linkedin\.com\/.*/).min(18).max(256).optional().allow(null, ''),
    address: Joi.object({
        city: Joi.string().trim().min(1).max(128).optional().allow(null, ''),
        country: Joi.string().trim().min(1).max(128).optional().allow(null, ''),
        details: Joi.string().trim().min(1).max(256).optional()
    }).optional().allow(null),
    languages: Joi.array().items(
        Joi.object({
            _id: Joi.string().optional().allow(null, ''), 
            name: Joi.string().trim().min(1).max(128).required(),
            skillLevel: Joi.string().valid('1', '1.5', '2', '2.5', '3', '3.5', '4', '4.5', '5').required()
        })
    ).optional().allow(null),
    toWork: Joi.boolean().optional().allow(null),
    toHire: Joi.boolean().optional().allow(null),
    gender: Joi.string().valid('M','F','N').optional().allow(null),
    uploadingImage: Joi.boolean().optional().allow(null),
    base64Image: Joi.string().optional().allow(null, ''),
});

export const userUpdateValidator = (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = userUpdateSchema.validate(req.body.user, { abortEarly: true });

    req.body.user = value

    if (error) {
        return res.status(400).json({
            success: false,
            message: error.details.map(detail => detail.message)
        });
    }

    next();
};
