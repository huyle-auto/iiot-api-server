import { poolPromise } from "../config/db.js";
import sql from 'mssql';

async function findLatestSensorRow(sensorId) {
    const pool = await poolPromise;
    const result = await pool.request()
        .input('sensorId', sensorId)
        .query(`
                SELECT TOP 1 *
                FROM [dbo].[SensorData] WHERE sensorId = @sensorId ORDER BY timestamp DESC
                    `)
    if (!result || !result.recordset) {
        return undefined;
    }

    return result.recordset[0];
}

export default {
    findLatestSensorRow
}