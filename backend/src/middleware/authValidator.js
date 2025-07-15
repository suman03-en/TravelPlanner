import {body,validationResult} from 'express-validator';
import { CustomError } from '../utils/customError.js';


// Register Validation
export const registerValidation = [
    body('name')
        .notEmpty()
        .withMessage('Name is required.')
        .isLength({ min: 4 })
        .withMessage('Name must be at least 4 characters long.'),

    body('email')
        .notEmpty()
        .withMessage('Email is required.')
        .isEmail()
        .withMessage('Please enter a valid email address.'),

    body('password')
        .notEmpty()
        .withMessage('Password is required.')
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 characters long.')
];

// Login Validation
export const loginValidation = [
    body('email')
        .notEmpty()
        .withMessage('Email is required.')
        .isEmail()
        .withMessage('Please enter a valid email address.'),

    body('password')
        .notEmpty()
        .withMessage('Password is required.')
];

//Trip validation
export const tripValidation = [
  body("trip_name").notEmpty().withMessage("Trip name is required."),
  body("location").notEmpty().withMessage("Location is required."),
  body("start_date").notEmpty().withMessage("Start date is required."),
];

//Plan validation

export const planValidation = [
  body("category").notEmpty().withMessage("Category is required."),
  body("budget_amount").isNumeric().withMessage("Budget amount must a number."),
];

//Document validation
export const documentValidation = [
  body("document_type").notEmpty().withMessage("Document type is required."),
  body("status").notEmpty().withMessage("Status is required."),
];


// Middleware to handle validation result
export const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(
            new CustomError(
                'Validation failed',
                400,
                errors.array()
            )
        );
    }
    next();
};
