const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        unique: true
    },
    deviceId: {
        type: String
    },
    topic: {
        type: String
    },
}, { timestamps: true });

module.exports = mongoose.model('Room', roomSchema);