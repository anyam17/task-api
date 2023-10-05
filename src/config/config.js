const dotenv = require('dotenv');
dotenv.config();

const config = {
    production: {
        DATABASE_URL: process.env.MONGODB_URI
    },
    default: {
        PORT: process.env.PORT,
        DATABASE_URL: process.env.MONGODB_URI
    }
}

exports.get = function get(env) {
    return config[env] || config.default
}