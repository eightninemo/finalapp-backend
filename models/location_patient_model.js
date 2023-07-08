const mongoose = require('mongoose')
const Schema = mongoose.Schema

const locationPatientSchema = new  Schema({
    userId: {
        type: String,
    },
    name: {
      type: String,
    },
    location: {
        type: String,
      },
}, {timestamps: true})

const LocationPatient = mongoose.model('LocationPatient', locationPatientSchema)
module.exports = LocationPatient