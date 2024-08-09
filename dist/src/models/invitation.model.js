"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const invitationSchema = new mongoose_1.default.Schema({
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
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Contract',
        required: true
    }
});
const Invitation = mongoose_1.default.model('Invitation', invitationSchema);
exports.default = Invitation;
