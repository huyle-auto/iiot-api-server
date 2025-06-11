import jwt from 'jsonwebtoken';
import tokenUtils from '../utils/token.utils.js';

const verifyAccessToken = (req, res, next) => {
    // const authHeader = req.headers['authorization'];
    // if (!authHeader) return res.status(401).json({ message: 'No token provided' });

    // const token = authHeader.split(' ')[1];
    // jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY, (err, user) => {
    //     if (err) return res.status(403).json({ message: 'Invalid token' });

    //     req.user = user;
    //     next();
    // });

    const token =
        req.cookies?.accessToken || req.headers['authorization']?.split(' ')[1]; // 🧾 fallback for Postman/testing

    if (!token) return res.status(401).json({ message: 'No token provided' });

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY, (err, user) => {
        if (err) return res.status(403).json({ message: 'Invalid token' });

        req.user = user; // attach decoded payload for next middleware/function
        next();
    });
}

const refreshToken = (req, res, next) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.status(401).json({ message: 'No refresh token provided' });

    try {
        const decodedToken = tokenUtils.verifyRefreshToken(refreshToken);
        const newAccessToken = tokenUtils.generateAccessToken({ id: decodedToken.id, email: decodedToken.email });

        res.cookie('accessToken', newAccessToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'Strict',
            maxAge: 15 * 60 * 1000  // 15 mins

        });

        res.status(200).json({ message: 'Access token refreshed' });
    }
    catch (err) {
        console.log('Refresh token error:', err);
        res.status(500).json({ message: 'Invalid refresh token' });
    }
}

export default {
    verifyAccessToken,
    refreshToken
}