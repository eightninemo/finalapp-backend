const mongoose = require('mongoose')
const Schema = mongoose.Schema

const patientSchema = new  Schema({
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

const Patient = mongoose.model('Patient', patientSchema)
module.exports = Patient