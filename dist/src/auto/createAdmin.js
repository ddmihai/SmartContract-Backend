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
const role_model_1 = __importDefault(require("../models/role.model"));
const user_model_1 = __importDefault(require("../models/user.model"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const handleCreateAdminAutomatically = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = process.env.ADMIN_EMAIL;
        const password = process.env.ADMIN_PASSWORD;
        // Check for existing user 
        const existingUser = yield user_model_1.default.findOne({ email });
        if (existingUser)
            return;
        const user = new user_model_1.default({ email, password });
        const savedUser = yield user.save();
        // check if the userId already exists on the roles
        const existingRole = yield role_model_1.default.findOne({ userId: savedUser._id });
        if (existingRole)
            return;
        // check if saved user exists and create 
        if (savedUser) {
            const role = yield role_model_1.default.findOne({ userId: savedUser._id });
            if (!role) {
                const newRole = new role_model_1.default({ name: 'ADMIN', userId: savedUser._id });
                yield newRole.save();
                console.log('Admin role created');
            }
            else
                return;
        }
    }
    catch (error) {
        console.error(error);
        throw error;
    }
});
exports.default = handleCreateAdminAutomatically;
