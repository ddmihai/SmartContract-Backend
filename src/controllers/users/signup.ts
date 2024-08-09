import { NextFunction, Request, Response } from "express";
import Role from "../../models/role.model";
import User from "../../models/user.model";




const signup = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;

        if (!email || !password || password.trim() === '')
            return res.status(400).json({ message: 'Please enter all fields' });

        const existingUser = await User.findOne({ email: email.toLowerCase().trim() });

        if (existingUser)
            return res.status(400).json({ message: 'User already exists' });

        // save the user
        const newUSer = new User({ email, password });
        const savedUser = await newUSer.save();

        // create a role
        const role = new Role({ userId: savedUser._id, name: 'client' });
        await role.save();

        return res.status(201).json({ message: 'User created successfully' });
    }

    catch (error) {
        console.error(error);
        next(error);
    }
}

export default signup;