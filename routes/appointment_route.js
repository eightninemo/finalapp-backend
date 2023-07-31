const express = require('express')
const router = express.Router()

const AppointmentController = require('../controllers/appointment_controller')

router.post('/upcoming-schedule', AppointmentController.upcomingSchedule)
router.get('/complete-schedule', AppointmentController.completedSchedule)

module.exports = router