const mongoose = require('mongoose')
require('dotenv').config();

const uri = process.env.REACT_APP_MONGO_CLOUD_URI;

mongoose.connect(uri, { useNewUrlParser: true })
    .then(() => { console.log("MongoDB database connection etablished successfully !") })
    .catch(e => { console.error('Connection error', e.message) })

const db = mongoose.connection

module.exports = db