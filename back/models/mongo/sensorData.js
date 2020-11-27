const mongoose = require('mongoose');

const sensorDataSchema = new mongoose.Schema({
    deviceId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Device',
        required: true
    },
    topic: {
        type: String,
        required: true,
    },
    data: {
        type: String
    }
}, { timestamps: true });

module.exports = mongoose.model('SensorData', sensorDataSchema);