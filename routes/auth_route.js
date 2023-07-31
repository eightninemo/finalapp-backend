const express = require('express')
const router = express.Router()

const PatientController = require('../controllers/patient_controller')
const DoctorController = require('../controllers/doctor_controller')


router.post('/patient-register', PatientController.register)
router.post('/doctor-register', DoctorController.register)
router.post('/user-login', PatientController.login)
router.post('/doctor-login', DoctorController.login)



module.exports = router