import mongoose from "mongoose";


const invitationSchema = new mongoose.Schema({

    senderEmail: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },

    receiverEmail: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },

    status: {
        type: String,
        enum: ['pending', 'accepted', 'rejected'],
        default: 'pending'
    },

    createdAt: {
        type: Date,
        default: Date.now
    },

    contractId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Contract',
        required: true
    }
});

const Invitation = mongoose.model('Invitation', invitationSchema);
export default Invitation;