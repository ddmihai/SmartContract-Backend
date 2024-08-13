import { Router } from 'express';
import createContract from '../controllers/contracts/createContract';
import getAllContracts from '../controllers/contracts/getAllContracts';
import editContract from '../controllers/contracts/editContract';
const contractsRouter = Router();




// Router
contractsRouter.post('/create', createContract);
contractsRouter.get('/all-contracts', getAllContracts);
contractsRouter.get('/', getAllContracts);
contractsRouter.put('/edit-contract', editContract);

export default contractsRouter;