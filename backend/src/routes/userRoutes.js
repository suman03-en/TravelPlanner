import express from 'express';
import { 
    getUserController, 
    registerUserController,
    getAllUsersController,
    LoginUser
} from '../controllers/userController.js';
import { verifyToken } from '../middleware/verifyToken.js';
import { loginValidation,registerValidation,validate } from '../middleware/authValidator.js';


const router = express.Router();

//Get /api/users : Returns all the users
router.get('/all',getAllUsersController);

router.get('/',verifyToken,getUserController);

router.post('/register/',registerValidation,validate,registerUserController);

router.post('/login/',loginValidation,validate,LoginUser);


export default router;