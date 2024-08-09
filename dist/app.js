"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = require("dotenv");
const user_routes_1 = __importDefault(require("./src/routes/user.routes"));
const express_session_1 = __importDefault(require("express-session"));
const connect_mongo_1 = __importDefault(require("connect-mongo"));
const invitation_routes_1 = __importDefault(require("./src/routes/invitation.routes"));
const contracts_routes_1 = __importDefault(require("./src/routes/contracts.routes"));
(0, dotenv_1.config)();
// init app and add the middleware
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)({
    origin: process.env.NODE_ENV === 'production' ? 'XXXXXXXXXXXXXXXXXXXXXXXXXXX' : 'http://localhost:3002',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}));
// create express sessions
app.set('trust proxy', 1);
app.use((0, express_session_1.default)({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: connect_mongo_1.default.create({
        mongoUrl: process.env.MONGO_URI,
        collectionName: 'sessions'
    }),
    cookie: {
        secure: app.get('env') === 'production',
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
        sameSite: app.get('env') === 'production' ? 'none' : 'lax',
        httpOnly: app.get('env') === 'production',
    }
}));
// home route
app.get('/', (req, res) => res.status(200).send('Server online!'));
app.use('/api/v1', user_routes_1.default);
app.use('/api/v1', invitation_routes_1.default);
app.use('/api/v1', contracts_routes_1.default);
// 404
app.use((req, res) => res.status(404).send('404 Not Found'));
// Error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});
exports.default = app;
