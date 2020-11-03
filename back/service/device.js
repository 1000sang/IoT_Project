const { Device, User } = require('../models');
const { createError } = require('../utils/error/error');

const Errors = (exports.Errors = {
    BadDeviceDataError: createError('BadDeviceDataError'),
    DuplicateDeviceError: createError('DuplicateDeviceError'),
    FailureCreateDevice: createError('FailureCreateDevice'),
    UnknownError: createError('UnkownError')
})

exports.createDevice = async (payload) => {
    try {
        return await Device.create({
            siteCode: payload.siteCode,
            topic: payload.topic
        })
    } catch (err) {
        switch (err.name) {
            case 'ValidationError':
                throw new Errors.BadDeviceDataError(err.message)
            default:
                throw new Errors.UnknownError(err.message)
        }
    }
}

