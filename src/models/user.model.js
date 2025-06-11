import { poolPromise } from '../config/db.js';

export const getAllUsersFromDB = async () => {
  const pool = await poolPromise;
  const result = await pool.request().query('SELECT * FROM [dbo].[User]');
  return result.recordset;
};

export const insertUserToDB = async (name, email) => {
  const pool = await poolPromise;
  await pool
    .request()
    .input('name', name)
    .input('email', email)
    .query('INSERT INTO [dbo].[User] VALUES (@name, @email)');
};
