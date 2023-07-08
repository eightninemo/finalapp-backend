const mongoose = require('mongoose')
const Schema = mongoose.Schema

const locationDoctorSchema = new  Schema({
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

const LocationDoctor = mongoose.model('LocationDoctor', locationDoctorSchema)
module.exports = LocationDoctor