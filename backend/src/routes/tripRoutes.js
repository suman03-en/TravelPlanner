import express from "express";
import {
  createTripController,
  deleteTripController,
  getAllTripsController,
  getTripController,
  updateTripController,
} from "../controllers/tripController.js";
import { validateIdparam } from "../middleware/validateId.js";
import {
  createPlanController,
  getPlansController,
} from "../controllers/planController.js";
import {
  createDocumentController,
  getAllDocumentsController,
} from "../controllers/documentController.js";

import { verifyToken } from "../middleware/verifyToken.js";
import { tripValidation,planValidation,documentValidation,validate } from "../middleware/validators.js";

const router = express.Router();

//middleware to allow routes to only logged-in user.
router.use(verifyToken);

//Trip routes
router.post("/", tripValidation, validate, createTripController);
router.get("/", getAllTripsController);
router.get("/:id", validateIdparam, getTripController);
router.put(
  "/:id",
  validateIdparam,
  tripValidation,
  validate,
  updateTripController
);
router.delete("/:id", validateIdparam, deleteTripController);

//plan routes (plan is inside the trips)
router.post(
  "/:id/plans",
  validateIdparam,
  planValidation,
  validate,
  createPlanController
);
router.get("/:id/plans", validateIdparam, getPlansController);

//document routes (nested under trip)
router.post(
  "/:id/documents",
  validateIdparam,
  documentValidation,
  validate,
  createDocumentController
);
router.get("/:id/documents", validateIdparam, getAllDocumentsController);

export default router;
