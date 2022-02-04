const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: String,
    isUser:{
        type: Boolean,
        default: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    cart: [{
        _id: false,
        itemId: String,
        quantity: {
            type:Number,
            default: 1
        }
    }],
    savedItem: [String],
    date: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('user', userSchema)