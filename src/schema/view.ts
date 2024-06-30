import { model, Schema, Types } from 'mongoose';
import { getCurrentUTCTime } from '../helper/utils';

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
        default: getCurrentUTCTime(),
        required: true
    },
    requested: {
        type: Boolean,
        default: false
    }
})

const View = model('View', viewSchema);

export default View;