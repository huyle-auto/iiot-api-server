import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/user.routes.js';
import authRoutes from './routes/auth.routes.js';
import { errorHandler } from './middlewares/error.middleware.js';

const app = express();

// Middlewares
app.use(express.json());

// const allowedOrigin = 'https://salmon-field-08f48e900.6.azurestaticapps.net';
// const corsOptions = {
//     origin: allowedOrigin,
//     credentials: true,
//     methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//     allowedHeaders: ['Content-Type', 'Authorization']
// };

const corsOptions = {
    origin: 'https://salmon-field-08f48e900.6.azurestaticapps.net',
    credentials: true
}
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

app.use(cookieParser());

// API Routes
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/auth', authRoutes);
app.use(errorHandler);

export default {
    app
}
