const mongoose = require('mongoose')
const { MONGO_URL } = process.env

mongoose.connect( MONGO_URL, {dbName: 'SocialMediaApp'}).catch(error => {
    if (error) console.log(error)
    else console.log('Connected to MongoDB.')
})

module.exports = mongoose.connection