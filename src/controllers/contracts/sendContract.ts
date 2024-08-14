import { Request, Response, NextFunction } from 'express';
import Contract from '../../models/contract.model';
import Invitation from '../../models/invitation.model';
import { sendEmail } from '../../lib/nodemailer';
import dotenv from 'dotenv';
dotenv.config();





export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { receiverEmail, contractId } = req.body;

        // Firstly, check if the contract exists
        const contract = await Contract.findById(contractId);
        if (!contract)
            return res.status(404).json({ message: 'Contract not found' });


        const createdInvitation = new Invitation({
            senderEmail: (req.session as any).user.email,
            receiverEmail: receiverEmail,
            contractId: contractId
        });

        const savedInvitationStatus = await createdInvitation.save();


        /**
         *              REMAINED HERE  - > CREATE A MODALITY TO SEND EMAILS TO INFORM THE RECEIVER EMAIL THAT WE HAVE AN INVITATION 
         */
        if (savedInvitationStatus) {
            await Contract.findByIdAndUpdate(contractId, { status: 'sent' });


            res.render('invitation', {
                title: 'You received an invitation',
                intro: 'Welcome to Contract Manager',
                message: `You received an invitation to sign a contract. Please read it thoroughly before signing. If you have any objections, you are welcome to reject the contract. If you don't have an account, you will be prompted to create one before signing the contract.`,
                link: `${process.env.NODE_ENV === 'production' ? `${process.env.FRONTEND}/${contractId}` : `http://localhost:3002/${contractId}`}`,
            },
                async (error, html) => {
                    if (error) {
                        console.error('Error rendering template:', error);
                        return res.status(500).send('Internal Server Error');
                    }

                    try {
                        await sendEmail({
                            to: receiverEmail,
                            from: process.env.ADMIN_EMAIL!,
                            subject: 'You received an invitation',
                            html: html
                        });
                        return res.status(200).json({ message: 'Invitation sent successfully' });
                    }
                    catch (err) {
                        console.error('Error sending email:', err);
                        res.status(500).send('Failed to send email');
                    }
                });

        }
    }

    catch (error) {
        console.error(error);
        next(error);
    }
}