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

    const one = (req, res) => {
        const userId = req.params.userId
        User.findOne({userId:userId}).then(user => {
            if (user) {
                res.status(200).json({
                    status: true,
                    data: user
                })
                console.log('Document:', user); 
            }
            else{
                res.status(404).json({
                    status: false,
                    message: 'User not found.'
                    })
                  console.log('User not found.');
        }
          })
          .catch(error => {
            res.status(500).json({
                status: false,
                message: 'Error finding User'
            })
            console.error('Error finding User:', error);
          })
    }
    
 module.exports = {login,one}