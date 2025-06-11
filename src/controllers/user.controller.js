import { getAllUsersFromDB, insertUserToDB } from '../models/user.model.js';

const getAllUsers = async (req, res) => {
  const users = await getAllUsersFromDB();
  res.json(users);
};

const createUser = async (req, res) => {
  const { name, email } = req.body;
  await insertUserToDB(name, email);
  res.status(201).json({ message: 'User created' });
};

export default {
  getAllUsers,
  createUser
}
