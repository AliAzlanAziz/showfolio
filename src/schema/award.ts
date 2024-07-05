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
        max: 256
    },
    desc: {
        type: String,
        required: true,
        min: 1,
        max: 1024
    },
    year: { 
        type: Number
    },
    imageURL: {
        type: String
    }
})

const Award = model('Award', awardSchema);

export default Award;