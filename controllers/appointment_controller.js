const Appointment = require('../models/appointment_model')
const Patient = require('../models/patient_model')
const Doctor = require('../models/doctor_model')
const { v4: uuidv4 } = require('uuid');


const aid = uuidv4();

// create upcoming schedule
const upcomingSchedule = (req, res) => {
    var appointmentId = aid
    var patientName = req.body.patientName 
    var doctorName = req.body.doctor_name
    let appointmentModel = Appointment({
        appointmentId: appointmentId,
        doctorName: req.body.doctorName,
        patientName: req.body.patientName,
        appointmentTime: req.body.appointmentTime,
    })
    console.log(appointmentModel)
    appointmentModel.save().then(response => { 
        Patient.updateMany({name: patientName}, 
        {$push:{upcomingSchedule: appointmentModel}})
        .then(response => {
            Doctor.updateMany({name: doctorName}, 
                {$push:{upcomingSchedule: appointmentModel}}).then(response => {
                    console.log('added to doctor too')
                })
            res.status(201).json({
                status: true,
                message: 'Appointment Scheduled Successfully',
            })

        })
    }).catch(error => {
        console.log(error)
        res.status(500).json({
            status: false,
            message: 'Error Scheduling Appointments'
        })
    })    // TODO: check why it is not updating in db  
}

const completedSchedule = (req,res) => {
    const appointmentId = req.params.appointmentId
    User.findOneAndUpdate({appointmentId: appointmentId},  
        {$set:{status: 'completed'}})
        .then(response => {
            res.status(200).json({
                status: true,
                message: 'Appointment Completed',
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
   upcomingSchedule, completedSchedule, 
}