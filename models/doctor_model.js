const mongoose = require('mongoose')
const Schema = mongoose.Schema

const doctorSchema = new  Schema({
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
    upcomingSchedule: {
        type: Array,
        default: []
    },
    completedSchedule: {
        type: Array,
        default: []
    },
}, {timestamps: true})

const Doctor = mongoose.model('Doctor', doctorSchema)
module.exports = Doctor