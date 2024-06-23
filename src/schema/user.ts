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
    currentPosition: {
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
    summary: {
        type: String
    },
    socials: [
        {
            platform: {
                type: String
            },
            link: {
                type: String
            }
        }
    ],
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
    ]
})

const User = model('User', userSchema);

export default User;