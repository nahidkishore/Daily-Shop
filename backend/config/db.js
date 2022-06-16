const mongoose = require('mongoose')
const env = require('./envConfig')
const connect = () => {
    try {
        mongoose.connect(env.URL);
        console.log('database connected successfully')
    }
    catch (error) {
        console.error(error.message);
        process.exit;
        

    }
}
module.exports = connect