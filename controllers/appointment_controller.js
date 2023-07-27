const Appointment = require('../models/appointment_model')

const aid = uuidv4();

// create upcoming schedule
const upcomingSchedule = (req, res) => {
    var appointmentId = aid
    
    let appointment = Appointment({
        appointmentId: appointmentId,
        doctorId: req.body.doctor,
        patient: req.body.patient,
        appointmentTime: req.body.appointmentTime,
    }) 
    console.log(appointment)
    Location.findOneAndUpdate({location_name: locationName}, 
        {$push:{doctors: userModel}})
        .then(response => {
            response.status(201).json({
                status: true,
                message: 'Employee Added Successfully',
                data: response
            })
        }).catch(error => {
            console.log(error)
            res.status(500).json({
                status: false,
                message: error
            })
        })
}

module.exports = {
   upcomingSchedule,
}