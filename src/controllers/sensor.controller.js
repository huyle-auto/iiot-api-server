import sensorService from '../services/sensor.service.js'

const getSensorData = async (req, res) => {
    const sensorId = req.params.id;
    const { from , to } = req.params.query;

};

const getSensorDataLatest = async (req, res) => {
    const sensorId = req.params.id;
    const result = await sensorService.getSensorDataLatest(sensorId);

    if (!result) {
        return res.status(404).json({ message: 'No latest sensor data found' });
    }

    res.status(200).json({ sensorId: result.sensorId, value: result.value, timestamp: result.timestamp, quality: result.quality });
};

export default {
    getSensorData,
    getSensorDataLatest
}