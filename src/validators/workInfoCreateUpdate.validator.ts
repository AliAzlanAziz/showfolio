import Joi from '@hapi/joi';
import { Request, Response, NextFunction } from 'express';
import { isBefore, parseISO } from 'date-fns';
import { WorkInfoType } from '../enums/workInfoType.enum';
import { JobModeType } from '../enums/jobModeType.enum';

const workInfoCreateUpdateSchema = Joi.object({
    title: Joi.string().trim().min(1).max(256).required(),
    desc: Joi.string().trim().min(1).max(512).required(),
    from: Joi.string().trim().isoDate().optional(),
    to: Joi.string().trim().isoDate().optional(),
    uploadingImage: Joi.boolean().optional(),
    base64Image: Joi.string().when('uploadingImage', {
        is: true,
        then: Joi.string().required(),
        otherwise: Joi.optional(),
    }),
    address: Joi.object({
        city: Joi.string().trim().min(1).max(128).optional(),
        country: Joi.string().trim().min(1).max(128).optional(),
        details: Joi.string().trim().min(1).max(256).optional()
    }).optional(),
    type: Joi.number().valid(WorkInfoType.EDUCATION, WorkInfoType.EXPERIENCE, WorkInfoType.CERTIFICATE).required(),
    jobMode: Joi.number().valid(JobModeType.REMOTE, JobModeType.ONSITE, JobModeType.HYBRID).required(),
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
    const { error } = workInfoCreateUpdateSchema.validate(req.body.workInfo, { abortEarly: false });

    if (error) {
        return res.status(400).json({
            success: false,
            message: error.details.map(detail => detail.message),
        });
    }

    next();
};
