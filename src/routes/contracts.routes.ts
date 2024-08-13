import { Router } from 'express';
import createContract from '../controllers/contracts/createContract';
import getAllContracts from '../controllers/contracts/getAllContracts';
const contractsRouter = Router();




// Router
contractsRouter.post('/create', createContract);
contractsRouter.get('/all-contracts', getAllContracts);

export default contractsRouter;