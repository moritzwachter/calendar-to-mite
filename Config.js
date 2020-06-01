require('dotenv').config();

module.exports = Object.freeze({
    MITE_API_KEY: process.env.MITE_API_KEY,
    MITE_ACCOUNT: process.env.MITE_ACCOUNT,
    INPUT_PATH: process.env.INPUT_PATH,
    GOOGLE_AUTH_DIRECTORY: process.env.GOOGLE_AUTH_DIRECTORY
})