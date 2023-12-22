const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URL)
    .then(() => console.log('MongoDB connection established'))
    .catch(err => console.log(`MongoDB error: ${err}`))

module.exports = mongoose