import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/user.routes.js';
import authRoutes from './routes/auth.routes.js';
import { errorHandler } from './middlewares/error.middleware.js';
import fs from 'fs';

const app = express();

// Certificate
const sslOptions = {
    key: fs.readFileSync('./ssl/key.pem'),
    cert: fs.readFileSync('./ssl/cert.pem')
};

// Middlewares
app.use(express.json());
app.use(cors({
    origin: undefined,
    credentials: true
}));
app.use(cookieParser());

// API Routes
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/auth', authRoutes);
app.use(errorHandler);

export default {
    app,
    sslOptions
}
