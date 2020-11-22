const mongoose = require('mongoose');
const glob = require('glob');
const dotenv = require('dotenv');

dotenv.config()

module.exports = () => {
    const connect = () => {
        mongoose.connect(process.env.MONGO_HOST, {
            useCreateIndex: true,
            useNewUrlParser: true
        }, (err) => {
            if (err) {
                console.log(err)
            }
            console.log('mongodb connected')
        })
    }

    connect();

    mongoose.connection.on('error', (err) => {
        console.log('몽고디비 연결 에러', err);
    });

    mongoose.connection.on('disconnected', () => {
        console.log('몽고디비 연결이 끊겼습니다. 재연결 시도합니다.')
        connect();
    });

    require('./room');

    // const models = glob.sync('back/models/mongo/*.js');

    // models.forEach(model => {
    //     console.log(model)
    //     require('../' + model)
    // })

}