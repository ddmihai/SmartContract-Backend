import mongoose from "mongoose";

const roleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    }
});

const Role = mongoose.model('Role', roleSchema);
export default Role;