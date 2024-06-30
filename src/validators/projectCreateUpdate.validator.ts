import Joi from '@hapi/joi';
import { Request, Response, NextFunction } from 'express';
import { isBefore, parseISO } from 'date-fns';

const projectCreateUpdateSchema = Joi.object({
    title: Joi.string().trim().min(1).max(256).required(),
    desc: Joi.string().trim().min(1).max(512).required(),
    contrib: Joi.string().trim().min(1).max(1200).optional(),
    from: Joi.string().trim().isoDate().optional(),
    to: Joi.string().trim().isoDate().optional(),
    uploadingImage: Joi.boolean().optional(),
    base64Image: Joi.string().when('uploadingImage', {
        is: true,
        then: Joi.string().required(),
        otherwise: Joi.optional(),
    }),
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
    const { error } = projectCreateUpdateSchema.validate(req.body.project, { abortEarly: false });

    if (error) {
        return res.status(400).json({
            success: false,
            message: error.details.map(detail => detail.message),
        });
    }

    next();
};
