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
}, { timestamps: true });

module.exports = mongoose.model('Room', roomSchema);