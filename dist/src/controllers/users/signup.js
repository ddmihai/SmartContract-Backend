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
const role_model_1 = __importDefault(require("../../models/role.model"));
const user_model_1 = __importDefault(require("../../models/user.model"));
const signup = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email || !password || password.trim() === '')
            return res.status(400).json({ message: 'Please enter all fields' });
        const existingUser = yield user_model_1.default.findOne({ email: email.toLowerCase().trim() });
        if (existingUser)
            return res.status(400).json({ message: 'User already exists' });
        // save the user
        const newUSer = new user_model_1.default({ email, password });
        const savedUser = yield newUSer.save();
        // create a role
        const role = new role_model_1.default({ userId: savedUser._id, name: 'client' });
        yield role.save();
        return res.status(201).json({ message: 'User created successfully' });
    }
    catch (error) {
        console.error(error);
        next(error);
    }
});
exports.default = signup;
