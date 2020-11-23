const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        unique: true
    },
    deviceId: {
        type: Array
    },
    topic: {
        type: Array
    },
    sessionID: {
        type: String
    }
}, { timestamps: true });

module.exports = mongoose.model('Room', roomSchema);