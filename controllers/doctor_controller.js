const Doctor = require('../models/doctor_model')
const User = require('../models/user_model')
const Location = require('../models/location_model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { v4: uuidv4 } = require('uuid');

const id = uuidv4();
const lid = uuidv4();

const register = (req, res) => {
    var email = req.body.email
    var type = req.body.type
    var locationName = req.body.location
    var userId = id
    
    bcrypt.hash(req.body.password, 10, function(err, hashedPass){
        if(err){
            res.json({
                error: err
            })
        }
        let userModel = new User({
            userId: userId,
            name: req.body.name,
            email: req.body.email,   
            phone: req.body.phone,
            type: req.body.type,
            password: hashedPass,
            location: req.body.location
        })
        let doctorModel = new Doctor({
            userId: userId,
            name: req.body.name,
            email: req.body.email,   
            phone: req.body.phone,
            type: req.body.type,
            password: hashedPass,
            location: req.body.location
        })
        let locationModel = new Location({
            locationId : lid,
            location_name : req.body.location,   
        })
        Doctor.findOne({email:email}).then(user => {
            if(user){
            res.status(404).json({
                status: false,
                message: 'user exists'
            })
        }else{
        doctorModel.save()
        .then(response => {
        res.json({
            status: true,
              message: 'User Added Successfully',
              data: response
        })
        userModel.save().then(response => {
            console.log('user added.')
        }) 
        Location.findOne({location_name: locationName}).then(location =>{
            if(location){
                if(type == 'doctor'){
                    Location.findOneAndUpdate({location_name: locationName}, 
                        {$push:{doctors: userModel}})
                    .then(response => {
                        console.log(response)
                    }).catch(error => {
                        console.log(error)
                    }) 
                   }else if(type == 'patient'){
                   Location.findOneAndUpdate({location_name: locationName}, 
                    {$push:{patients: userModel}})
                   .then(response => {
                     console.log(response)
                   }).catch(error => {
                     console.log(error)
                   }) 
                   }
            }else{
                locationModel.save().then(response => {
                console.log(response)
                if(type == 'doctor'){
                    Location.findOneAndUpdate({location_name: locationName}, 
                        {$push:{doctors: userModel}})
                    .then(response => {
                        console.log(response)
                    }).catch(error => {
                        console.log(error)
                    }) 
                   }else if(type == 'patient'){
                   Location.findOneAndUpdate({location_name: locationName}, 
                    {$push:{patients: userModel}})
                   .then(response => {
                     console.log(response)
                   }).catch(error => {
                     console.log(error)
                   }) 
                   }
                }).catch(error => {
                console.log(error)
                })
            }
        })
        
    }).catch(error => {
        res.status(500).json({
        message: 'An error occured: ' + error
                    })
                })
            }
        })
    }) 
}


module.exports = {
        register
     }