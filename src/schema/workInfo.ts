import { model, Schema, Types } from 'mongoose';

const workInfoSchema = new Schema({
    _id: {
        type: Types.ObjectId,
    },
    user: {
        type: Types.ObjectId,
        ref: 'user'
    },
    type: {
        type: Number,
        required: true
    },
    title: { // degree, designation, certificate name
        type: String,
        required: true,
        min: 1,
        max: 512
    },
    place_name: { // school, company, academy
        type: String,
        required: true,
        min: 1,
        max: 512
    },
    from: { 
        type: Date
    },
    to: { 
        type: Date
    },
    summary: { 
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
    pdf_uploaded: {
        type: Boolean,
        default: false
    }
})

const workInfo = model('workInfo', workInfoSchema);

export default workInfo;