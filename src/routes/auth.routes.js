import express from 'express';
import authValidator from '../validators/auth.validator.js';
import authController from '../controllers/auth.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';

const router = express.Router();

router.get('/me', authMiddleware.verifyAccessToken, authController.sendUserAuthStatus); // Already sent (403) Invalid token if accessToken is invalid
router.post('/login', authValidator.validateUserCredentials, authController.login);
router.post('/signup', authValidator.validateUserCredentials, authController.signup);
router.post('/logout', authController.logout);
router.post('/refresh-token', authMiddleware.refreshToken);

export default router;