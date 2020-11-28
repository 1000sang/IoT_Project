const axios = require('axios')

export default axios.create({
    baseURL: 'localhost',
    port: 3065,
    withCredentials: true
})
