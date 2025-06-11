import tokenUtils from '../utils/token.utils.js';
import authModel from '../models/auth.model.js';
import bcrypt from 'bcrypt';

async function login(email, password) {
    const user = await authModel.findUserByEmail(email);

    try {
        // Can't even find user
        if (!user) {
            return null;
        }

        // Wrong pasword
        if (!await bcrypt.compare(password, user.password)) {
            return null;
        }

        // Sign JWT token
        const payload = {id: user.id, email: user.email};   // JWT token payload: user id and email 
        const accessToken = tokenUtils.generateAccessToken(payload);
        const refreshToken = tokenUtils.generateRefreshToken(payload);

        return { accessToken, refreshToken};

    }
    catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
}

async function signup(email, password) {
    const user = await authModel.findUserByEmail(email);

    if (user) {
        return user;
    }

    authModel.createUser(email, bcrypt.hashSync(password, Number(process.env.BCRYPT_SALT_ROUNDS)))
        .then(() => {
            return null;
        })
        .catch(err => {
            console.error('Error creating user:', err);
            return undefined;
        })
}

export default {
    login,
    signup
}