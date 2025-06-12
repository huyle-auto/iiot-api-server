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

const allowedOrigin = 'https://salmon-field-08f48e900.6.azurestaticapps.net';
const corsOptions = {
    origin: allowedOrigin,
    credentials: true,
    method: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
};
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

app.use(cookieParser());

// API Routes
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/auth', authRoutes);
app.use(errorHandler);

export default {
    app,
    sslOptions
}
