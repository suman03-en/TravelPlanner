import express from 'express';
import { verifyToken } from '../middleware/verifyToken.js';
import { deletedocumentController } from '../controllers/documentController.js';
import { validateIdparam } from '../middleware/validateId.js';

const router = express.Router();

router.use(verifyToken);


router.delete('/:id',validateIdparam,deletedocumentController); 



export default router;