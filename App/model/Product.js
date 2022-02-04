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
    vendorId: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    image: [{
        type: String,
        require: true
    }],
    rating:[{
        rate: Number,
        userId: String
    }],
    date:{
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('product', productSchema)