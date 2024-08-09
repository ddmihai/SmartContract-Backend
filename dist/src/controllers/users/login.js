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
const user_model_1 = __importDefault(require("../../models/user.model"));
const role_model_1 = __importDefault(require("../../models/role.model"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        // Check for empty fields to prevent errors in mongoose and bcrypt
        if (!email || !password || email.trim() === '' || password.trim() === '') {
            return res.status(400).json({ message: 'Email and password are required' });
        }
        // Check for existing user
        const existingUser = yield user_model_1.default.findOne({ email });
        if (!existingUser) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        // Check the hash
        const isPasswordCorrect = yield bcryptjs_1.default.compare(password, existingUser.password);
        if (!isPasswordCorrect) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        // Check for the role
        const role = yield role_model_1.default.findOne({ userId: existingUser._id });
        // Setup the session
        req.session.user = {
            id: existingUser._id,
            email: existingUser.email,
            role: role === null || role === void 0 ? void 0 : role.name
        };
        return res.status(200).json({ message: 'Login successful' });
    }
    catch (error) {
        console.error(error);
        next(error);
    }
});
exports.default = login;
