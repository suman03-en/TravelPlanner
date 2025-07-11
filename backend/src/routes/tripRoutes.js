import express from 'express';
import { 
    createTripController,
    deleteTripController,
    getAllTripsController,
    getTripController,updateTripController

 } from '../controllers/tripController.js';
import { validateIdparam } from '../middleware/validateId.js';
import { createPlanController, getPlansController } from '../controllers/planController.js';
import { verifyToken } from '../middleware/verifyToken.js';

const router = express.Router();

//middleware to allow routes to only logged user.
router.use(verifyToken);

router.post('/',createTripController);
router.get('/',getAllTripsController);
router.get('/:id',validateIdparam,getTripController);
router.put('/:id',validateIdparam,updateTripController);
router.delete('/:id',validateIdparam,deleteTripController);

router.post('/:id/plans',validateIdparam,createPlanController);
router.get('/:id/plans',validateIdparam,getPlansController);


export default router;