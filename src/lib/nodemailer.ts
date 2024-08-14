import { createTransport, SendMailOptions } from "nodemailer";
import dotenv from "dotenv";
dotenv.config();



// Create transport with options
export const transporter = createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user: process.env.ADMIN_EMAIL, // your email address
        pass: process.env.EMAIL_PASSWORD, // your email password or app-specific password
    },
});




export interface EmailOptions extends SendMailOptions {
    from: string;
    to: string;
    subject: string;
    html: any;
    attachments?: {   // Attachments are optional
        filename: string;
        path?: string; // Path to file on disk
        content?: Buffer | string; // File content if not using path
    }[];
}




export const sendEmail = async (options: EmailOptions): Promise<void> => {
    try {
        const info = await transporter.sendMail(options);
        console.log("Email sent: " + info.response);
    }
    catch (err) {
        console.error("Error sending email: ", err);
        throw err; // Re-throw the error after logging it
    }
}
