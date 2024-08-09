import { Router } from "express";
import login from "../controllers/users/login";
import signup from "../controllers/users/signup";
import getUserData from "../controllers/users/getUserData";


const userRouter = Router();


userRouter.post('/login', login);
userRouter.post('/signup', signup);
userRouter.post('/getUserData', getUserData);

// export
export default userRouter; 