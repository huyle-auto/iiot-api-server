import { body, validationResult } from 'express-validator';

const validateUserCredentials = [
    body('email').isEmail().withMessage('Invalid email format'),
    body('password')
        .notEmpty().withMessage('Password is required')
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const message = errors.array().map(err => err.msg);
            return res.status(400).json({ message });
        }
        next(); // Jump to the next middleware or route handler
    }
]

export default {
    validateUserCredentials
}