import { Request, Response, NextFunction } from 'express';
import Contract from '../../models/contract.model';


export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { content, contractId } = req.body;
        const editStatus = await Contract.findByIdAndUpdate(contractId, { content });
        if (editStatus)
            return res.status(200).json({ message: 'Contract updated successfully' });
    }

    catch (error) {
        console.error(error);
        next(error);
    }
};
