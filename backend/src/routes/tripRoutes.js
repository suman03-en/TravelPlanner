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
import { body } from "express-validator";
import { validate } from "../middleware/authValidator.js";

const router = express.Router();

//middleware to allow routes to only logged-in user.
router.use(verifyToken);

//Trip validation
const tripValidation = [
  body("trip_name").notEmpty().withMessage("Trip name is required."),
  body("location").notEmpty().withMessage("Location is required."),
  body("start_date").notEmpty().withMessage("Start date is required."),
];

//Plan validation

const planValidation = [
  body("category").notEmpty().withMessage("Category is required."),
  body("budget_amount").isNumeric().withMessage("Budget amount must a number."),
];

//Document validation
const documentValidation = [
  body("document_type").notEmpty().withMessage("Document type is required."),
  body("status").notEmpty().withMessage("Status is required."),
];

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
