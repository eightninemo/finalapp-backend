const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new  Schema({
    userId: {
        type: String
    },
    name: {
        type: String
    },
    email: {
        type: String
    },
    phone: {
        type: String
    },
    password: {
        type: String
    },
    type: {
        type: String
    },
    location: {
        type: String
    },

}, {timestamps: true})

const User = mongoose.model('User', userSchema)
module.exports = User