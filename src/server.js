import app from './app.js';
import dotenv from 'dotenv';
// import https from 'https';

dotenv.config();

const PORT = process.env.PORT || 3030;

// Default express HTTP server
app.listen(PORT, () => console.log(`🚀 API server running on http://localhost:${PORT}`));

// HTTPS server
// https.createServer(appModule.sslOptions, appModule.app).listen(PORT, () => {
//     console.log('Https server is running on https://localhost:', PORT);
// });
