const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    userId: {
        type: String,
        require: true
    },
    vendorId: {
        type: String,
        require: true
    },
    productId: {
        type: String,
        require: true
    },
    reference: String,
    price: {
        type: Number,
        require: true
    },
    status: String
}, { timestamps: true })

module.exports = mongoose.model('order', orderSchema)