import mongoose from "mongoose";
import bcrypt from 'bcryptjs';



const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },

    password: {
        type: String,
        required: true
    }
});



// use pre method to hash the password
userSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
});



const User = mongoose.model('User', userSchema);
export default User;