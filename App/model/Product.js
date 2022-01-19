const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    userId: {
        type: String,
        require: true
    },
    image: {
        type: String,
        require: true
    },
    rating:[{
        rate: Number,
        UserId: String
    }],
    date:{
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('product', productSchema)