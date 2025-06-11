import { poolPromise } from "../config/db.js";
import sql from 'mssql';

async function findUserByEmail(email) {
    const pool = await poolPromise;
    const result = await pool.request()
        .input('email', sql.VarChar, email)
        .query('SELECT * FROM [dbo].[Account] WHERE email = @email');

    if (!result || !result.recordset) {
        console.log('result:', result.recordset.value);
        return undefined;
    }

    return result.recordset[0];
}

async function createUser(email, password) {
    const pool = await poolPromise;
    const result = await pool.request()
        .input('email', sql.VarChar, email)
        .input ('password', sql.Char, password)
        .query ('INSERT INTO [dbo].[Account] (email, password) VALUES (@email, @password)');
}

export default {
    findUserByEmail,
    createUser
}