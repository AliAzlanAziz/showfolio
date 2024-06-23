import { match } from 'assert';
import { model, Schema, Types } from 'mongoose';

const awardSchema = new Schema({
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
        max: 512
    },
    description: {
        type: String,
        required: true,
        min: 1,
        max: 512
    },
    workDone: { 
        type: String,
    },
    year: { 
        type: String,
        match: /^\d{4}$/
    },
    imageURL: {
        type: String
    }
})

const Award = model('Award', awardSchema);

export default Award;