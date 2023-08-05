const User = require('../models/user_model')
const bcrypt = require('bcryptjs')

const login = (req, res) => {
    var email = req.body.email
    var password = req.body.password
    User.findOne({$or: [{email:email}]})
    .then(user => {
        if(user){
            bcrypt.compare(password, user.password, function(err, result){
                if(err){
                        res.status(404).json({
                            status: false,
                            error: err
                        })
                    }
                if(result){
                       res.status(200).json({
                        status: true,
                        message: 'Login Successful',
                        data: user
                       })
                    }else{
                        res.status(500).json({
                            status: false,
                            message: 'Invalid Password',
                            
                        })
                    }
                })
            }else{
                res.status(404).json({
                    status: false,
                    error: 'User not found.'
                })
            }
        })
    }

 module.exports = {login}