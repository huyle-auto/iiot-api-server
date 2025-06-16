import express from 'express';
import sensorController from '../controllers/sensor.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';

const router = express.Router();

router.get('/:id', authMiddleware.verifyAccessToken, sensorController.getSensorData);   // Get data in time range
router.get('/:id/latest', authMiddleware.verifyAccessToken, sensorController.getSensorDataLatest);


export default router;