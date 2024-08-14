import { Router } from 'express';
import createContract from '../controllers/contracts/createContract';
import getAllContracts from '../controllers/contracts/getAllContracts';
import editContract from '../controllers/contracts/editContract';
import sendContract from '../controllers/contracts/sendContract';
const contractsRouter = Router();




// Router
contractsRouter.post('/create', createContract);
contractsRouter.get('/all-contracts', getAllContracts);
contractsRouter.get('/', getAllContracts);
contractsRouter.put('/edit-contract', editContract);
contractsRouter.post('/send-contract', sendContract);



export default contractsRouter;