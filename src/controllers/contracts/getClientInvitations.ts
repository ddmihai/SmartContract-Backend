import { Request, Response, NextFunction } from 'express';
import Invitation from '../../models/invitation.model';
import Contract from '../../models/contract.model';

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = (req.session as any).user;

        // If user is not logged in, send unauthorized response
        if (!user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        // Get the invitations for the logged-in user
        const invitations = await Invitation.find({ receiverEmail: user.email });

        // If no invitations found, send not found response
        if (invitations.length === 0) {
            return res.status(404).json({ message: 'No invitations found' });
        }

        // Fetch all contracts related to the invitations
        const contractPromises = invitations.map((invitation) =>
            Contract.findById(invitation.contractId)
        );

        const contractResults = await Promise.all(contractPromises);

        // Filter out any null results (in case some contract IDs don't exist)
        const contracts = contractResults.filter(contract => contract !== null);

        // Return the contracts in the response
        return res.status(200).json(contracts);

    }

    catch (error) {
        console.error(error);
        next(error);
    }
};
