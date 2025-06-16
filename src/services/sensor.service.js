import sensorModel from '../models/sensor.model.js'

async function getSensorDataLatest(sensorId) {
    try {
        const latestSensorRow = await sensorModel.findLatestSensorRow(sensorId);

        // No latest row found
        if (latestSensorRow == undefined) {
            return null;
        }

        return latestSensorRow;
    }
    catch (err) {
        console.error('Error get latest sensor data:', err.message);
    }
}

export default {
    getSensorDataLatest
}