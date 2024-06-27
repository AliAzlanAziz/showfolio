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
    to: {
        type: Types.ObjectId,
        ref: 'User',
        required: true
    },
    time: { 
        type: Date,
        default: new Date()
    }
})

const Award = model('Award', awardSchema);

export default Award;