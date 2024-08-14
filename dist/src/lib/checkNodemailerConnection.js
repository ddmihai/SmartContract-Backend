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
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkNodemailerConnection = void 0;
const nodemailer_1 = require("./nodemailer");
const checkNodemailerConnection = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Verify connection configuration
        yield nodemailer_1.transporter.verify();
        console.log('Nodemailer transporter configuration verified successfully');
    }
    catch (error) {
        console.error('Error verifying Nodemailer transporter configuration:', error);
        // You can choose to throw the error or handle it appropriately based on your application's needs
        throw error;
    }
});
exports.checkNodemailerConnection = checkNodemailerConnection;
