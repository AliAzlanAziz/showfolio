import { model, Schema, Types } from 'mongoose';
import { SubscriptionType } from '../enums/subscriptionType.enum';
import { getCurrentUTCTime } from '../helper/utils';
import { SubscriptionReasonType } from '../enums/subscriptionReason.enum';

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
        default: getCurrentUTCTime()
    },
    amount: {
        type: Number,
        required: true
    },
    reason: {
        type: String,
        required: true,
        enum: [SubscriptionReasonType.FULL_ACCESS_SUBSCRIPTION]
    }
})

const Subscription = model('Subscription', subscriptionSchema);

export default Subscription;