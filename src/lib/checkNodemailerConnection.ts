import { transporter } from "./nodemailer";




export const checkNodemailerConnection = async () => {
    try {
        // Verify connection configuration
        await transporter.verify();
        console.log('Nodemailer transporter configuration verified successfully');
    }
    catch (error) {
        console.error('Error verifying Nodemailer transporter configuration:', error);
        // You can choose to throw the error or handle it appropriately based on your application's needs
        throw error;
    }
};
