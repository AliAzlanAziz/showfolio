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
        max: 512
    },
    name: { // school, company, academy
        type: String,
        required: true,
        min: 1,
        max: 512
    },
    from: { 
        type: Date
    },
    to: { 
        type: Date
    },
    desc: { 
        type: String
    },
    address: {
        city: {
            type: String
        },
        country: {
            type: String
        },
        details: {
            type: String
        },
    },
    imageUrl: {
        type: String
    }
})

const WorkInfo = model('WorkInfo', workInfoSchema);

export default WorkInfo;