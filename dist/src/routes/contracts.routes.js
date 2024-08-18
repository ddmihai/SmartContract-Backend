"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const createContract_1 = __importDefault(require("../controllers/contracts/createContract"));
const getAllContracts_1 = __importDefault(require("../controllers/contracts/getAllContracts"));
const editContract_1 = __importDefault(require("../controllers/contracts/editContract"));
const sendContract_1 = __importDefault(require("../controllers/contracts/sendContract"));
const getClientInvitations_1 = __importDefault(require("../controllers/contracts/getClientInvitations"));
const contractsRouter = (0, express_1.Router)();
// Router
contractsRouter.post('/create', createContract_1.default);
contractsRouter.get('/all-contracts', getAllContracts_1.default);
contractsRouter.get('/', getAllContracts_1.default);
contractsRouter.put('/edit-contract', editContract_1.default);
contractsRouter.post('/send-contract', sendContract_1.default);
contractsRouter.get('/client-invitations', getClientInvitations_1.default);
exports.default = contractsRouter;
