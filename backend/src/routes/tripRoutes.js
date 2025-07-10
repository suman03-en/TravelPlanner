import express from 'express';
import { 
    createTripController,
    deleteTripController,
    getAllTripsController,
    getTripController,updateTripController

 } from '../controllers/tripController.js';

import { createPlanController } from '../controllers/planController.js';
import { verifyToken } from '../middleware/verifyToken.js';

const router = express.Router();

//middleware to allow routes to only logged user.
router.use(verifyToken);

router.post('/',createTripController);
router.get('/',getAllTripsController);
router.get('/:id',getTripController);
router.put('/:id',updateTripController);
router.delete('/:id',deleteTripController);

router.post('/:id/plans',createPlanController);


export default router;