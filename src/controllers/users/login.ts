import { Request, Response, NextFunction } from 'express';
import User from '../../models/user.model';
import Role from '../../models/role.model';
import bcrypt from 'bcryptjs';

const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;

        // Check for empty fields to prevent errors in mongoose and bcrypt
        if (!email || !password || email.trim() === '' || password.trim() === '') {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        // Check for existing user
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Check the hash
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordCorrect) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Check for the role
        const role = await Role.findOne({ userId: existingUser._id });

        // Setup the session
        (req.session as any).user = {
            id: existingUser._id,
            email: existingUser.email,
            role: role?.name
        };

        return res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        console.error(error);
        next(error);
    }
};

export default login;
