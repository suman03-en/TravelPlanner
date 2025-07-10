import express from 'express';
import { verifyToken } from '../middleware/verifyToken.js';

router = express.Router()
router.use(verifyToken);

router.post();
