import { model, Schema, Types } from 'mongoose';

const projectSchema = new Schema({
    _id: {
        type: Types.ObjectId,
    },
    user: {
        type: Types.ObjectId,
        ref: 'user',
    },
    title: {
        type: String,
        required: true,
        min: 1,
        max: 512
    },
    description: {
        type: String,
        required: true,
        min: 1,
        max: 512
    },
    work_done: { 
        type: String,
    },
    from: { 
        type: Date
    },
    to: { 
        type: Date
    }
})

const Project = model('Project', projectSchema);

export default Project;