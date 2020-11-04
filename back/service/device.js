const { Device, User, UserDevice } = require('../models');
const device = require('../models/device');
const { createError } = require('../utils/error/error');

const Errors = (exports.Errors = {
    BadDeviceDataError: createError('BadDeviceDataError'),
    DuplicateDeviceError: createError('DuplicateDeviceError'),
    FailureCreateDevice: createError('FailureCreateDevice'),
    DeviceIdNotFound: createError('DeviceIdNotFound'),
    UnknownError: createError('UnkownError')
})

exports.findAllDeviceById = async (userId) => {
    const result = await UserDevice.findAll({
        where: { userId: userId },
        attributes: ['deviceId']
    })
        .then((rows) => {
            return rows.map((r) => {
                return r.deviceId
            })
        })

    if (!result) {
        throw new Errors.DeviceIdNotFound()
    }

    return result;
}

exports.getAllDevice = async (payload) => {
    try {
        const findAll = await this.findAllDeviceById(payload.userId);

        // findAll.map((v) => {
        //     console.log(v)
        // })

        return findAll;
    } catch (err) {
        console.log(err)
    }
}

exports.createDevice = async (payload) => {
    try {
        const createDevice = await Device.create({
            siteCode: payload.siteCode,
            topic: payload.topic
        });

        const createUserDevice = await UserDevice.create({
            deviceId: createDevice.deviceId,
            userId: payload.userId
        })

        const result = await UserDevice.findAll({
            where: {
                userId: payload.userId
            }
        })

        return result
    } catch (err) {
        switch (err.name) {
            case 'ValidationError':
                throw new Errors.BadDeviceDataError()
            default:
                throw new Errors.UnknownError()
        }
    }
}

exports.addDevice = async (payload) => {
    try {
        const addUserDevice = await UserDevice.create({
            deviceId: payload.deviceId,
            userId: payload.userId
        })

        return addUserDevice;
    } catch (err) {
        console.log(err)
        switch (err.name) {
            case 'SequelizeUniqueConstraintError':
                throw new Errors.DuplicateDeviceError()
            default:
                throw new Errors.UnknownError()
        }
    }
}

exports.findOneByDeviceId = async (deviceId) => {
    const findOneByDeviceId = await Device.findOne({
        where: {
            deviceId: deviceId
        }
    })

    if (!findOneByDeviceId) {
        throw new Errors.DeviceIdNotFound()
    }

    return findOneByDeviceId
}

