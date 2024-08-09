import { Request, Response, NextFunction } from 'express';
import Contract from '../../models/contract.model';




const createContract = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const { title, content } = req.body;
        const createdBy = (req.session as any).user._id; //USER ID

        if (!title || !content)
            return res.status(400).json({ message: 'Title and content are required' });


        const existingContract = await Contract.findOne({ title: title.toLowerCase().trim() });

        if (existingContract)
            return res.status(400).json({ message: 'Contract with this title already exists' });


        // create contract
        const newContract = new Contract({
            title,
            content,
            createdBy
        });

        await newContract.save();
        return res.status(201).json({ message: 'Contract created successfully' });
    }

    catch (error) {
        console.error(error);
        next(error);
    }
};

export default createContract;