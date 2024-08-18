import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import userRouter from './src/routes/user.routes';
import session from 'express-session';
import MongoStore from 'connect-mongo'
import invitationRouter from './src/routes/invitation.routes';
import { engine } from 'express-handlebars';
import contractsRouter from './src/routes/contracts.routes';
import path from 'path';
config();


// init app and add the middleware
const app: Application = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: process.env.NODE_ENV === 'production' ? 'XXXXXXXXXXXXXXXXXXXXXXXXXXX' : 'http://localhost:3001',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}));



// create express sessions
app.set('trust proxy', 1);
app.use(session({
    secret: process.env.SESSION_SECRET as string,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI as string,
        collectionName: 'sessions'
    }),
    cookie: {
        secure: app.get('env') === 'production',
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
        sameSite: app.get('env') === 'production' ? 'none' : 'lax',
        httpOnly: app.get('env') === 'production',
    }
}));



// Express Handlebars
app.engine('handlebars', engine({
    extname: '.handlebars',
    defaultLayout: 'main',
    layoutsDir: 'src/views/layouts'
}));

app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'src', 'views'));





// home route
app.get('/', (req, res) => res.status(200).json({ message: 'Welcome to contract manager' }));



app.use('/api/v1', userRouter);
app.use('/api/v1', invitationRouter);
app.use('/api/v1', contractsRouter);






// 404
app.use((req, res) => res.status(404).send('404 Not Found'));

// Error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});


export default app;