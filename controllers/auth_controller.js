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
        let location = new Location({
            locationId : lid,
            location_name : req.body.location,   
        })
        User.findOne({email:email}).then(user => {
            if(user){
            res.status(404).json({
                message: 'user exists'
            })
        }else{
        userModel.save()
        .then(response => {
        res.json({
              message: 'User Added Successfully',
              data: response
        })
        location.save().then(response => {
            console.log(response)  
        }).catch(error => {
            console.log(error)
        })
    }).catch(error => {
        res.json({
        message: 'An error occured: ' + error
                    })
                })
            }
        })
    }) 
    if(type == 'doctor'){
        Location.findOneAndUpdate({location_name: locationName}, {$push:{doctors: userModel}})
        .then(response => {
            console.log(response)
        }).catch(error => {
            console.log(error)
        }) 
       }else if(type == 'patient'){
       Location.findOneAndUpdate({location_name: locationName}, {$push:{patients: userModel}})
       .then(response => {
         console.log(response)
       }).catch(error => {
         console.log(error)
       }) 
       }
}

const login = (req, res) => {
    var email = req.body.email
    var password = req.body.password
    User.findOne({$or: [{email:email}]})
    .then(user => {
        if(user){
            bcrypt.compare(password, user.password, function(err, result){
                if(err){
                        res.json({
                            error: err
                        })
                    }
                if(result){
                       res.status(200).json({
                        message: 'Login Successful',
                        data: user
                       })
                    }else{
                        res.status(200).json({
                            message: 'Invalid Password',
                            
                        })
                    }
                })
            }
        })
    }

module.exports = {
        register, login
     }