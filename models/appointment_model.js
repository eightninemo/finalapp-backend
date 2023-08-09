const mongoose = require('mongoose')
const Schema = mongoose.Schema

const appointmentSchema = new  Schema({
    appointmentId: {
        type: String
    },
    doctorName: {
        type: String
    },
    patientName: {
        type: String
    },
    status: {
        type: String,
    },
},{timestamps: true})

const Appointment = mongoose.model('Appointment', appointmentSchema)
module.exports = Appointment