import mongoose from "mongoose";



const companySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true
    },

    shortAddress: {
        type: String,
        required: true
    },

    phone: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },

    website: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },

    logo: {
        type: String
    },

    description: {
        type: String,
        required: true
    },

    createdAt: {
        type: Date,
        default: Date.now
    },

    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

const Company = mongoose.model('Company', companySchema);
export default Company;