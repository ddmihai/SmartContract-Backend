import { Router } from 'express';
import createContract from '../controllers/contracts/createContract';
const contractsRouter = Router();




// Router
contractsRouter.post('/create', createContract);

export default contractsRouter;