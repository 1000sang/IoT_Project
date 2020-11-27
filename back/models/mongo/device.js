const mongoose = require('mongoose');

const deviceSchema = new mongoose.Schema({
    deviceId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    topic: {
        type: String,
        required: true
    },
}, { timestamps: false });

module.exports = mongoose.model('Device', deviceSchema);