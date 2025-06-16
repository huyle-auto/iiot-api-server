import authService from '../services/auth.service.js';

const login = async (req, res) => {
    const { email, password } = req.body;
    const tokens = await authService.login(email, password);

    if (!tokens) return res.status(401).json({ message: "Invalid email or password" });

    res
        .cookie('accessToken', tokens.accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'None',
            maxAge: 15 * 60 * 1000 // 15 mins
        })
        .cookie('refreshToken', tokens.refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'None',
            maxAge: 1 * 24 * 60 * 60 * 1000 // 1 days
        })
        .json({ message: 'Login successful' });
};

const signup = async (req, res) => {
    const { email, password } = req.body;
    const user = await authService.signup(email, password);

    if (user) {
        res.status(409).json({ error: "Email has already been registered" });
    }

    if (user === null) {
        res.status(201).json({ message: "User created successfully" });
    }

    if (user === undefined) {
        res.status(500).json({ error: "Internal server error" });
    }
}

const logout = (req, res) => {
  res.clearCookie('accessToken', {
    httpOnly: true,
    secure: true,
    sameSite: 'Strict'
  });
  res.clearCookie('refreshToken', {
    httpOnly: true,
    secure: true,
    sameSite: 'Strict'
  });
  res.status(200).json({ message: 'Logout successful' });
};

const sendUserAuthStatus = (req, res) => {
    res.status(200).json({
        authenticated: true,
        user: {
            id: req.user.id,
            email: req.user.email
        }
    })}

export default {
    login,
    signup,
    logout,
    sendUserAuthStatus
}
