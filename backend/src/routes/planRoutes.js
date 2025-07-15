import express from 'express';

import { verifyToken } from '../middleware/verifyToken.js';
import { validateIdparam } from '../middleware/validateId.js';
import { deletePlanController } from '../controllers/planController.js';

const router = express.Router()

router.use(verifyToken);

router.delete('/:id',validateIdparam,deletePlanController);

export default router;