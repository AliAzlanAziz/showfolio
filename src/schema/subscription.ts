import { model, Schema, Types } from 'mongoose';
import { SubscriptionType } from '../enums/subscriptionType.enum';

const subscriptionSchema = new Schema({
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
        enum: [SubscriptionType.MONTHLY, SubscriptionType.YEARLY],
        required: true
    },
    time: { 
        type: Date,
        default: (new Date()).toUTCString()
    },
    amount: {
        type: Number,
        required: true
    }
})

const Subscription = model('Subscription', subscriptionSchema);

export default Subscription;