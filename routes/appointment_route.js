const express = require('express')
const router = express.Router()

const AppointmentController = require('../controllers/appointment_controller')

router.post('/upcoming-schedule', AppointmentController.upcomingSchedule)
router.post('/complete-schedule/:appointmentId', AppointmentController.completedSchedule)

module.exports = router