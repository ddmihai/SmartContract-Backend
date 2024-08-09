import Role from "../models/role.model";
import User from "../models/user.model";
import dotenv from 'dotenv';
dotenv.config();


const handleCreateAdminAutomatically = async () => {
    try {
        const email = process.env.ADMIN_EMAIL!;
        const password = process.env.ADMIN_PASSWORD!;

        // Check for existing user 
        const existingUser = await User.findOne({ email });
        if (existingUser) return;


        const user = new User({ email, password });
        const savedUser = await user.save();

        // check if the userId already exists on the roles
        const existingRole = await Role.findOne({ userId: savedUser._id });
        if (existingRole) return;


        // check if saved user exists and create 
        if (savedUser) {
            const role = await Role.findOne({ userId: savedUser._id });
            if (!role) {
                const newRole = new Role({ name: 'ADMIN', userId: savedUser._id });
                await newRole.save();
                console.log('Admin role created');
            }
            else return;
        }


    }

    catch (error) {
        console.error(error);
        throw error;
    }
}

export default handleCreateAdminAutomatically;