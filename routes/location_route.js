const express = require('express')
const router = express.Router()

const LocationController = require('../controllers/location_controller')


router.get('/all', LocationController.all)
router.get('/show/:locationId', LocationController.one)



module.exports = router