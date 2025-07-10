import express from 'express';
import { 
    getUserController, 
    registerUserController,
    getAllUsersController,
    LoginUser
} from '../controllers/userController.js';
import { verifyToken } from '../middleware/verifyToken.js';


const router = express.Router();

//Get /api/users : Returns all the users
router.get('/all',getAllUsersController);

router.get('/',verifyToken,getUserController);

router.post('/register/',registerUserController);

router.post('/login/',LoginUser);


export default router;