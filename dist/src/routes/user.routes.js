"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const login_1 = __importDefault(require("../controllers/users/login"));
const signup_1 = __importDefault(require("../controllers/users/signup"));
const userRouter = (0, express_1.Router)();
userRouter.post('/login', login_1.default);
userRouter.post('/signup', signup_1.default);
// export
exports.default = userRouter;
