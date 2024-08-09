import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import userRouter from './src/routes/user.routes';
import session from 'express-session';
import MongoStore from 'connect-mongo'
import invitationRouter from './src/routes/invitation.routes';
import contractsRouter from './src/routes/contracts.routes';
config();


// init app and add the middleware
const app: Application = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));



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



// home route
app.get('/', (req, res) => res.send('Hello World!'));


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