const mongoose = require('mongoose')

const vendorSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    date: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('vendor', vendorSchema)