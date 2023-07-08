const Location = require('../models/location_model')

// show all locations
const all = (req, res) => {
    Location.find()
    .then(response => {
        res.status(200).json({
            data: response
        })
    }).catch(error => {
        res.status(!200).json({
            message: 'An error occured'
        })
    })
}

// get cafetaria by ID
const one = (req, res) => {
    const locationName = req.params.locationName
    Location.findOne(locationName)
    .then(response => {
        res.status(200).json({
            data: response
        })
    }).catch(error => {
        res.status(!200).json({
            message: 'An error occured'
        })
    })
}

module.exports = {
    all, one 
}