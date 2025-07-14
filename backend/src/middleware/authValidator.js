import {body,validationResult} from 'express-validator';


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

// Middleware to handle validation result
export const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};
