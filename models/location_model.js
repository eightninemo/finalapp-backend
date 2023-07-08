const mongoose = require('mongoose')
const Schema = mongoose.Schema

const locationSchema = new  Schema({
    locationId: {
        type: String,
    },
    location_name:{
      type: String
    },
    doctors: {
      type: Array,
      default: [],
    },
    patients: {
      type: Array,
      default: [],
    },
}, {timestamps: true})

const Location = mongoose.model('Location', locationSchema)
module.exports = Location