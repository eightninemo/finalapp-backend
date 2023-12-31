const express = require('express')
const router = express.Router()

const PatientController = require('../controllers/patient_controller')
const DoctorController = require('../controllers/doctor_controller')
const UserController = require('../controllers/auth_controller')

router.post('/patient-register', PatientController.register)
router.post('/doctor-register', DoctorController.register)
router.post('/user-login', UserController.login)
router.get('/find-user/:userId', UserController.one)




module.exports = router