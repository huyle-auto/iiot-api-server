export const validateCreateUser = (req, res, next) => {
  const { name, email } = req.body;
  if (!name || !email) return res.status(400).json({ error: 'Missing name or email' });
  next();
};

