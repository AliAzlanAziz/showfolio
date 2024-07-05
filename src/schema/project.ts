import { model, Schema, Types } from 'mongoose';

const projectSchema = new Schema({
    _id: {
        type: Types.ObjectId,
    },
    user: {
        type: Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true,
        min: 1,
        max: 256
    },
    desc: {
        type: String,
        required: true,
        min: 1,
        max: 1024
    },
    contrib: { 
        type: String,
        required: true,
        min: 1,
        max: 1200
    },
    from: { 
        type: Date
    },
    to: { 
        type: Date
    },
    imageURL: {
        type: String
    }
})

const Project = model('Project', projectSchema);

export default Project;