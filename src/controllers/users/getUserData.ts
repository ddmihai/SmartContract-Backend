import { NextFunction, Request, Response } from 'express';

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        // get data from session
        const user = (req.session as any).user;

        if (!req.session || !(req.session as any).user)
            return res.status(401).json({ message: 'Unauthorized' });


        // send the data
        return res.status(200).json({ user });
    }
    catch (error) {
        console.error(error);
        next(error);
    }
};