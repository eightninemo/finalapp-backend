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
    Location.findOne({location_name: locationName}, function(err,response){
        if (err) {
            res.status(200).json({
                message: err
            })
          }
          if (!response) {
            res.status(200).json({
                message: 'Location not found.'
            })
          }
        res.status(200).json({
            data: response
        })
    })
}

module.exports = {
    all, one 
}