const mongoose = require('mongoose');

const deviceSchema = new mongoose.Schema({
    deviceId: {
        type: String,
        required: true,
        unique: true
    },
    topic: {
        type: String,
        required: true
    },
}, { timestamps: false });

module.exports = mongoose.model('Device', deviceSchema);