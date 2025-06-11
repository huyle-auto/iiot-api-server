import express from 'express';
import userController from '../controllers/user.controller.js';
import { validateCreateUser } from '../validators/user.validator.js';
import authMiddleware from '../middlewares/auth.middleware.js';

const router = express.Router();

router.get('/', authMiddleware.verifyAccessToken, userController.getAllUsers);
router.post('/', validateCreateUser, userController.createUser);

export default router;
