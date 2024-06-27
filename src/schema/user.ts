import { model, Schema, Types } from 'mongoose';

const userSchema = new Schema({
    _id: {
        type: Types.ObjectId,
    },
    name: {
        type: String,
        required: true,
        min: 1,
        max: 256
    },
    username: {
        type: String,
        required: true,
        unique: true,
        min: 1,
        max: 256
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
        type: String
    },
    phone: {
        type: String,
        unique: true,
        match: /^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/
    },
    imageURL: {
        type: String
    },
    desc: {
        type: String
    },
    fb: {
        type: String,
        match: /https:\/\/[a-z]{2,3}\.facebook\.com\/.*/
    },
    ig: {
        type: String,
        match: /https:\/\/[a-z]{2,3}\.instagram\.com\/.*/
    },
    yt: {
        type: String,
        match: /https:\/\/[a-z]{2,3}\.youtube\.com\/.*/
    },
    gh: {
        type: String,
        match: /https:\/\/[a-z]{2,3}\.github\.com\/.*/
    },
    tw: {
        type: String,
        match: /https:\/\/[a-z]{2,3}\.twitter\.com\/.*/
    },
    li: {
        type: String,
        match: /https:\/\/[a-z]{2,3}\.linkedin\.com\/.*/
    },
    web: {
        type: String
    },
    address: {
        city: {
            type: String
        },
        country: {
            type: String
        },
        details: {
            type: String
        },
    },
    languages: [
        {
            name: {
                type: String
            },
            skillLevel: {
                type: String
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
    }
})

const User = model('User', userSchema);

export default User;