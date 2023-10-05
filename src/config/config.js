const dotenv = require('dotenv');
dotenv.config();

const config = {
    default: {
        PORT: process.env.PORT,
        DATABASE_URL: process.env.MONGODB_URI
    }
}

exports.get = function get(env) {
    return config.default
}