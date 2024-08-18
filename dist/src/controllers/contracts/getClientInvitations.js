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
const invitation_model_1 = __importDefault(require("../../models/invitation.model"));
const contract_model_1 = __importDefault(require("../../models/contract.model"));
exports.default = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.session.user;
        // If user is not logged in, send unauthorized response
        if (!user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        // Get the invitations for the logged-in user
        const invitations = yield invitation_model_1.default.find({ receiverEmail: user.email });
        // If no invitations found, send not found response
        if (invitations.length === 0) {
            return res.status(404).json({ message: 'No invitations found' });
        }
        // Fetch all contracts related to the invitations
        const contractPromises = invitations.map((invitation) => contract_model_1.default.findById(invitation.contractId));
        const contractResults = yield Promise.all(contractPromises);
        // Filter out any null results (in case some contract IDs don't exist)
        const contracts = contractResults.filter(contract => contract !== null);
        // Return the contracts in the response
        return res.status(200).json(contracts);
    }
    catch (error) {
        console.error(error);
        next(error);
    }
});
