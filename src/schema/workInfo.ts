import { model, Schema, Types } from 'mongoose';
import { WorkInfoType } from '../enums/workInfoType.enum';
import { JobModeType } from '../enums/jobModeType.enum';

const workInfoSchema = new Schema({
    _id: {
        type: Types.ObjectId,
    },
    user: {
        type: Types.ObjectId,
        ref: 'User',
        required: true
    },
    type: {
        type: Number,
        required: true,
        enum: [WorkInfoType.EDUCATION, WorkInfoType.EXPERIENCE, WorkInfoType.CERTIFICATE]
    },
    jobMode: {
        type: Number,
        enum: [JobModeType.REMOTE, JobModeType.ONSITE, JobModeType.HYBRID]
    },
    title: { // degree, designation, certificate name
        type: String,
        required: true,
        min: 1,
        max: 256
    },
    name: { // school, company, academy
        type: String,
        required: true,
        min: 1,
        max: 256
    },
    from: { 
        type: Date
    },
    to: { 
        type: Date
    },
    desc: { 
        type: String,
        min: 1,
        max: 1024
    },
    address: {
        city: {
            type: String,
            min: 1,
            max: 128
        },
        country: {
            type: String,
            min: 1,
            max: 128
        },
        details: {
            type: String,
            min: 1,
            max: 256
        },
    },
    imageUrl: {
        type: String
    }
})

const WorkInfo = model('WorkInfo', workInfoSchema);

export default WorkInfo;