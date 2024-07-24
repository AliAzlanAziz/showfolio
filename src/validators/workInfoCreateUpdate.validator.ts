import Joi from '@hapi/joi';
import { Request, Response, NextFunction } from 'express';
import { isBefore, parseISO } from 'date-fns';
import { WorkInfoType } from '../enums/workInfoType.enum';
import { JobModeType } from '../enums/jobModeType.enum';

const workInfoCreateUpdateSchema = Joi.object({
    id: Joi.string().optional().allow(null, ''),
    title: Joi.string().trim().min(1).max(256).required(),
    desc: Joi.string().trim().min(1).max(512).required(),
    from: Joi.string().trim().isoDate().optional().allow(null, ''),
    to: Joi.string().trim().isoDate().optional().allow(null, ''),
    uploadingImage: Joi.boolean().optional().allow(null, ''),
    base64Image: Joi.string().when('uploadingImage', {
        is: true,
        then: Joi.string().required(),
        otherwise: Joi.optional(),
    }),
    address: Joi.object({
        city: Joi.string().trim().min(1).max(128).optional().allow(null, ''),
        country: Joi.string().trim().min(1).max(128).optional().allow(null, ''),
        details: Joi.string().trim().min(1).max(256).optional()
    }).optional().allow(null),
    type: Joi.number().valid(WorkInfoType.EDUCATION, WorkInfoType.EXPERIENCE, WorkInfoType.CERTIFICATE).required(),
    jobMode: Joi.number().valid(JobModeType.REMOTE, JobModeType.ONSITE, JobModeType.HYBRID).optional().allow(null),
    name: Joi.string().trim().min(1).max(256).required(),
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

export const workInfoCreateUpdateValidator = (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = workInfoCreateUpdateSchema.validate(req.body.workInfo, { abortEarly: true });

    req.body.workInfo = value

    if (error) {
        return res.status(400).json({
            success: false,
            message: error.details.map(detail => detail.message),
        });
    }

    next();
};
