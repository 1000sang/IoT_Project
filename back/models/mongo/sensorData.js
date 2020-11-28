const mongoose = require('mongoose');

const sensorDataSchema = new mongoose.Schema({
    topic: {
        type: String,
    },
    data: {
        type: String
    }
}, { timestamps: true });

// sensorDataSchema.index({ "createAt": 1 })

module.exports = mongoose.model('SensorData', sensorDataSchema);