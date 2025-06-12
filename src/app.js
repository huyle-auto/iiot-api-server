import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/user.routes.js';
import authRoutes from './routes/auth.routes.js';
import { errorHandler } from './middlewares/error.middleware.js';

const app = express();

// Middlewares
const allowedOrigin = 'https://salmon-field-08f48e900.6.azurestaticapps.net';
const corsOptions = {
    origin: allowedOrigin,
    credentials: true,
};

// // Apply to all routes
app.use(cors(corsOptions));

// // Handle preflight explicitly (optional but safest)
app.use((req, res, next) => {
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Origin', allowedOrigin);
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');
    return res.sendStatus(204);
  }
  next();
});

app.use(express.json());
app.use(cookieParser());

// API Routes
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/auth', authRoutes);
app.use(errorHandler);

export default {
    app
}
