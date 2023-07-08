const express = require('express')
const router = express.Router()

const LocationController = require('../controllers/location_controller')


router.post('/all', LocationController.all)
router.post('/show/:locationId', LocationController.one)



module.exports = router