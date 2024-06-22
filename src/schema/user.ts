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
    current_position: {
        type: String
    },
    phone: {
        type: String
    },
    image: {
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
    is_cv_uploaded: {
        type: Boolean,
        default: false
    },
    languages: [
        {
            name: {
                type: String
            },
            skill_level: {
                type: String
            },
            certified: {
                type: Boolean,
                default: false
            }
        }
    ]
    // potential_positions: [ // in v2 or v3
    //     {
    //         title: {
    //             type: String
    //         }
    //     }
    // ]
})

const User = model('User', userSchema);

export default User;