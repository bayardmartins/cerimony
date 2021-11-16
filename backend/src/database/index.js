const mongoose = require('mongoose')
mongoose.connect(process.env.MONGO_CONNECT)

module.exports = mongoose