import Joi from '@hapi/joi';
import { Request, Response, NextFunction } from 'express';
import { isBefore, parseISO } from 'date-fns';

const projectCreateUpdateSchema = Joi.object({
    id: Joi.string().optional(),
    title: Joi.string().trim().min(1).max(256).required(),
    desc: Joi.string().trim().min(1).max(512).required(),
    contrib: Joi.string().trim().min(1).max(1200).optional().allow(null, ''),
    from: Joi.string().trim().isoDate().optional().allow(null, ''),
    to: Joi.string().trim().isoDate().optional().allow(null, ''),
    uploadingImage: Joi.boolean().optional().allow(null, ''),
    base64Image: Joi.string().optional().allow(null, ''),
}).custom((obj, helpers) => {
    if (obj.from && obj.to) {
        const fromDate = parseISO(obj.from);
        const toDate = parseISO(obj.to);
        if (!isBefore(fromDate, toDate)) {
            return helpers.message({ custom: '"from" date must be before "to" date' });
        }
    }
    return obj;
});

export const projectCreateUpdateValidator = (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = projectCreateUpdateSchema.validate(req.body.project, { abortEarly: true });

    req.body.project = value

    if (error) {
        return res.status(400).json({
            success: false,
            message: error.details.map(detail => detail.message),
        });
    }

    next();
};
