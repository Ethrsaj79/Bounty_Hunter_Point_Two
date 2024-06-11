const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Bounty Poster Schema
const posterSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    living: {
        type: Boolean,
        required: true
    },
    type: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true
    },
    paymentType: {
        type: String
    }
})

module.exports = mongoose.model("Poster", posterSchema)