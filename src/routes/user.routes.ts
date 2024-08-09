import { Router } from "express";
import login from "../controllers/users/login";
import signup from "../controllers/users/signup";


const userRouter = Router();


userRouter.post('/login', login);
userRouter.post('/signup', signup);

// export
export default userRouter; 