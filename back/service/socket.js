const { Site } = require('../models');
const { createError } = require('../utils/error/error');

const Errors = (exports.Errors = {
    UnknownSocketError: createError('UnknownSocketError')
})

exports.createRoom = async (payload) => {

}
