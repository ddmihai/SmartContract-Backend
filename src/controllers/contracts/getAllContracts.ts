import { Request, Response, NextFunction } from 'express';
import Contract from '../../models/contract.model';


export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = (req.session as any).user;
        if (!user)
            return res.status(401).json({ message: 'Unauthorized' });

        const contracts = await Contract.find();
        return res.status(200).json(contracts);
    }

    catch (error) {
        console.error(error);
        next(error);
    }
}