const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    deviceId: {
        type: String,
        required: true,
        unique: true
    },
    topic: {
        type: String
    },
    data: {
        type: String
    }
}, { timestamps: true });

module.exports = mongoose.model('Data', dataSchema);