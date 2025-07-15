import express from 'express';
import { 
    getUserController, 
    registerUserController,
    getAllUsersController,
    LoginUser,
} from '../controllers/userController.js';
import { verifyToken } from '../middleware/verifyToken.js';
import {
    loginValidation,
    registerValidation,
    validate,
} from '../middleware/validators.js';


const router = express.Router();

//Get  all the users (Only for testing purpose)
router.get('/all',getAllUsersController);

//get current logged in user
router.get('/',verifyToken,getUserController);

//register new user
router.post('/register/',registerValidation,validate,registerUserController);

//login
router.post('/login/',loginValidation,validate,LoginUser);


export default router;