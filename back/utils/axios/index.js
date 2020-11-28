const axios = require('axios')

const instance = axios.create({
    baseURL: 'https://localhost:3065',
})

module.exports = instance
