import { model, Schema, Types } from 'mongoose';
import { SubscriptionType } from '../enums/subscriptionType.enum';
import { GenderType } from '../enums/genderType.enum';
import { getCurrentUTCTime } from '../helper/utils';

const userSchema = new Schema({
    _id: {
        type: Types.ObjectId,
    },
    name: {
        type: String,
        required: true,
        min: 4,
        max: 128
    },
    username: {
        type: String,
        required: true,
        unique: true,
        min: 4,
        max: 128
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    password: {
        type: String,
        required: true
    },
    position: {
        type: String,
        min: 3,
        max: 128
    },
    phone: {
        type: String,
        // unique: true,
        match: /^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
        min: 9,
        max: 128
    },
    imageURL: {
        type: String,
        // min: 1,
        // max: 1024
    },
    desc: {
        type: String,
        min: 1,
        max: 512
    },
    fb: {
        type: String,
        match: /https:\/\/[a-z]{2,3}\.facebook\.com\/.*/,
        min: 18,
        max: 256
    },
    ig: {
        type: String,
        match: /https:\/\/[a-z]{2,3}\.instagram\.com\/.*/,
        min: 18,
        max: 256
    },
    yt: {
        type: String,
        match: /https:\/\/[a-z]{2,3}\.youtube\.com\/.*/,
        min: 18,
        max: 256
    },
    gh: {
        type: String,
        match: /https:\/\/[a-z]{2,3}\.github\.com\/.*/,
        min: 18,
        max: 256
    },
    tw: {
        type: String,
        match: /https:\/\/[a-z]{2,3}\.twitter\.com\/.*/,
        min: 18,
        max: 256
    },
    li: {
        type: String,
        match: /https:\/\/[a-z]{2,3}\.linkedin\.com\/.*/,
        min: 18,
        max: 256
    },
    web: {
        type: String,
        min: 4,
        max: 256
    },
    address: {
        city: {
            type: String,
            min: 1,
            max: 128
        },
        country: {
            type: String,
            min: 1,
            max: 128
        },
        details: {
            type: String,
            min: 1,
            max: 256
        },
    },
    languages: [
        {
            name: {
                type: String,
                min: 1,
                max: 128
            },
            skillLevel: {
                type: Number,
                enum: [1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5]
            }
        }
    ],
    toWork: {
        type: Boolean,
        default: false
    },
    toHire: {
        type: Boolean,
        default: false
    },
    public: {
        type: Boolean,
        default: false
    },
    paidDate: {
        type: Date,
        default: null
    },
    subsType: {
        type: Number,
        enum: [SubscriptionType.MONTHLY, SubscriptionType.YEARLY, SubscriptionType.NONE],
        default: SubscriptionType.NONE
    },
    code: {
        type: String,
        match: /^[0-9]{6}$/
    },
    token: {
        type: String,
        match: /^[0-9]{12}$/
    },
    validTill: {
        type: Date,
        default: null
    },
    tags: {
        type: String,
        default: ''
    },
    points: {
        type: Number,
        default: 0
    },
    gender: {
        type: String,
        enum: [GenderType.MALE, GenderType.FEMALE, GenderType.PREFER_NOT_SAY],
        default: null
    },
    createdAt: {
        type: Date,
        default: getCurrentUTCTime()
    },
    lastActivity: {
        type: Date,
        default: getCurrentUTCTime()
    }
})

userSchema.pre('save', function() {
    this.email = this.email.toLocaleLowerCase();
    this.username = this.username.toLocaleLowerCase();
    this.lastActivity = getCurrentUTCTime()
});


const User = model('User', userSchema);

export default User;