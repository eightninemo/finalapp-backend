const express = require('express')
const router = express.Router()

const AuthController = require('../controllers/auth_controller')


router.post('/user-register', AuthController.register)
router.post('/user-login', AuthController.login)



module.exports = router