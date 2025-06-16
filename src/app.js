import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/user.routes.js';
import authRoutes from './routes/auth.routes.js';
import sensorRoutes from './routes/sensor.routes.js';
import { errorHandler } from './middlewares/error.middleware.js';
import corsDevOptions from './cors/cors.dev.js';
import corsProdOption from './cors/cors.production.js';

const app = express();

// App-level Middlewares
app.use(cors(corsProdOption));  // cors always FIRST (then options (if needed))

app.use((req, res, next) => {   // Handle preflight explicitly (optional but safest)
  res.on('finish', () => {
    console.log(`[${req.method}] ${req.originalUrl}`);
    console.log('Sent Headers:', res.getHeaders());
  });
  next();
});

app.use(express.json());    // Then body parser
app.use(cookieParser());
                            // then routes        
// API Routes
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/sensors', sensorRoutes);
app.use(errorHandler);

export default app
