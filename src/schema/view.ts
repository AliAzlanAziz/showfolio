import { model, Schema, Types } from 'mongoose';

const viewSchema = new Schema({
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
        default: (new Date()).toUTCString()
    },
    requested: {
        type: Boolean,
        default: false
    }
})

const View = model('View', viewSchema);

export default View;