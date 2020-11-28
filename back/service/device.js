const { Device, User, UserDevice } = require('../models');
const { createError } = require('../utils/error/error');
const SensorData = require('../models/mongo/sensorData');

const Errors = (exports.Errors = {
    BadDeviceDataError: createError('BadDeviceDataError'),
    DuplicateDeviceError: createError('DuplicateDeviceError'),
    FailureCreateDevice: createError('FailureCreateDevice'),
    DeviceIdNotFound: createError('DeviceIdNotFound'),
    UnknownError: createError('UnkownError')
})

exports.getSensorData = async (data) => {
    try {
        let datas = [];
        let data;
        await data.map(async (v) => {
            data = await SensorData.findOne({ topic: v.topic }).sort({ createAt: -1 })
            datas.push(data)
        })
        return datas
    } catch (err) {
        console.log(err)
    }
}

exports.findDeviceByUserId = async (userId) => {
    const result = await UserDevice.findAll({
        where: { userId: userId }
    })

    if (!result) {
        throw new Errors.DeviceIdNotFound()
    }

    return result
}

exports.findAllDeviceById = async (userId) => {
    let deviceData = {};

    const result = await UserDevice.findAll({
        where: { userId: userId },
        attributes: ['deviceId']
    })

    if (!result) {
        throw new Errors.DeviceIdNotFound()
    }

    result.map((r, v) => {
        deviceData[v] = r.dataValues.deviceId
    })

    return deviceData;
}

exports.findAllDeviceTopic = async () => {
    try {
        const findAllDeviceTopic = await Device.findAll();

        return findAllDeviceTopic;
    } catch (err) {
        console.log(err)
    }
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

