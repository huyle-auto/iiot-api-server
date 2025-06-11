import jwt from 'jsonwebtoken';

function generateAccessToken(payload) {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET_KEY, { expiresIn: '15m' });
}

function generateRefreshToken(payload) {
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET_KEY, { expiresIn: '1d'})
}

function verifyAccessToken(token) {
    return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY);
}

function verifyRefreshToken(token) {
    return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET_KEY);
}


export default {
    generateAccessToken,
    generateRefreshToken,
    verifyAccessToken,
    verifyRefreshToken
}