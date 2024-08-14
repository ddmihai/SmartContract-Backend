"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const contract_model_1 = __importDefault(require("../../models/contract.model"));
const invitation_model_1 = __importDefault(require("../../models/invitation.model"));
const nodemailer_1 = require("../../lib/nodemailer");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.default = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { receiverEmail, contractId } = req.body;
        // Firstly, check if the contract exists
        const contract = yield contract_model_1.default.findById(contractId);
        if (!contract)
            return res.status(404).json({ message: 'Contract not found' });
        const createdInvitation = new invitation_model_1.default({
            senderEmail: req.session.user.email,
            receiverEmail: receiverEmail,
            contractId: contractId
        });
        const savedInvitationStatus = yield createdInvitation.save();
        /**
         *              REMAINED HERE  - > CREATE A MODALITY TO SEND EMAILS TO INFORM THE RECEIVER EMAIL THAT WE HAVE AN INVITATION
         */
        if (savedInvitationStatus) {
            yield contract_model_1.default.findByIdAndUpdate(contractId, { status: 'sent' });
            res.render('invitation', {
                title: 'You received an invitation',
                intro: 'Welcome to Contract Manager',
                message: `You received an invitation to sign a contract. Please read it thoroughly before signing. If you have any objections, you are welcome to reject the contract. If you don't have an account, you will be prompted to create one before signing the contract.`,
                link: `${process.env.NODE_ENV === 'production' ? `${process.env.FRONTEND}/${contractId}` : `http://localhost:3002/${contractId}`}`,
            }, (error, html) => __awaiter(void 0, void 0, void 0, function* () {
                if (error) {
                    console.error('Error rendering template:', error);
                    return res.status(500).send('Internal Server Error');
                }
                try {
                    yield (0, nodemailer_1.sendEmail)({
                        to: receiverEmail,
                        from: process.env.ADMIN_EMAIL,
                        subject: 'You received an invitation',
                        html: html
                    });
                    return res.status(200).json({ message: 'Invitation sent successfully' });
                }
                catch (err) {
                    console.error('Error sending email:', err);
                    res.status(500).send('Failed to send email');
                }
            }));
        }
    }
    catch (error) {
        console.error(error);
        next(error);
    }
});
