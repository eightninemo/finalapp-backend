const User = require('../models/user_model')
const LocationDoctor = require('../models/location_doctor_model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const register = (req, res) => {
    var email = req.body.email
    var type = req.body.type
    var userId = req.body.userId
    bcrypt.hash(req.body.password, 10, function(err, hashedPass){
        if(err){
            res.json({
                error: err
            })
        }
        let userModel = new User({
            name: req.body.name,
            email: req.body.email,   
            phone: req.body.phone,
            type: req.body.type,
            password: hashedPass,
            location: req.body.location
        })
        let doctorLocation = new LocationDoctor({
            userId : userId,
            name : req.body.name,
            location : req.body.name, 
        })
        let patientLocation = new LocationDoctor({
            userId : userId,
            name : req.body.name,
            location : req.body.name, 
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
        if(type == 'doctor'){
            doctorLocation.save()
            .then(response => {
                console.log(response)
                
            }).catch(error => {
                console.log(error)
            }) 
        }else if(type == 'patient'){
            patientLocation.save()
            .then(response => {
                console.log(response)
                
            }).catch(error => {
                console.log(error)
            }) 
        }
    })
        .catch(error => {
            res.json({
                message: 'An error occured: ' + error
            })
        })
        }
    })
    })   
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