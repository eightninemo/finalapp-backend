const mongoose = require('mongoose')
const Schema = mongoose.Schema

const appointmentSchema = new  Schema({
    appointmentId: {
        type: String
    },
    doctor: {
        type: String
    },
    patient: {
        type: String
    },
    appointmentTime: {
        type: Date,
    },  
}, {timestamps: true})

const Appointment = mongoose.model('Appointment', appointmentSchema)
module.exports = Appointment