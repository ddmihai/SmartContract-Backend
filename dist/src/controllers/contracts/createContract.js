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
const createContract = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, content } = req.body;
        const createdBy = req.session.user._id; //USER ID
        if (!title || !content)
            return res.status(400).json({ message: 'Title and content are required' });
        const existingContract = yield contract_model_1.default.findOne({ title: title.toLowerCase().trim() });
        if (existingContract)
            return res.status(400).json({ message: 'Contract with this title already exists' });
        // create contract
        const newContract = new contract_model_1.default({
            title,
            content,
            createdBy
        });
        yield newContract.save();
        return res.status(201).json({ message: 'Contract created successfully' });
    }
    catch (error) {
        console.error(error);
        next(error);
    }
});
exports.default = createContract;
