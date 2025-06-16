const allowedOrigin = 'https://salmon-field-08f48e900.6.azurestaticapps.net';
const corsProdOptions = {
    origin: allowedOrigin,
    credentials: true,
    optionsSuccessStatus: 200,     // For legacy browsers
    preflightContinue: false       // Let cors() handle the OPTIONS request itself
};

export default corsProdOptions

// ---------- Usage (in app) ------------
// // Apply to all routes
// app.use(cors(corsOptions));

// // Does not handle preflight. Let cors do its job
// app.use((req, res, next) => {
//   res.on('finish', () => {
//     console.log(`[${req.method}] ${req.originalUrl}`);
//     console.log('Sent Headers:', res.getHeaders());
//   });
//   next();
// });