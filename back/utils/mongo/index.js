const mongoose = require('mongoose');
const glob = require('glob');

module.exports = () => {
    mongoose.connect('mongodb+srv://csh47790:cjstkdgml1!@devfloors.1moli.mongodb.net/Devfloors?retryWrites=true&w=majority', (err) => {
        if (err) {
            console.log(err)
        }
        console.log('mongodb connected')
    })

    // const models = glob.sync('back/models/mongo/*.js');

    // models.forEach(model => {
    //     console.log(model)
    //     require('../' + model)
    // })

}