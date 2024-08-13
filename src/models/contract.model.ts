import mongoose from "mongoose";

const contractSchema = new mongoose.Schema({
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    title: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },

    content: {
        type: String,
        required: true
    },

    createdAt: {
        type: Date,
        default: Date.now
    },

    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected', 'sent'],
        default: 'pending'
    }
});

const Contract = mongoose.model('Contract', contractSchema);
export default Contract;    