const Appointment = require('../models/appointment_model')
const Patient = require('../models/patient_model')
const Doctor = require('../models/doctor_model')
const User = require('../models/user_model')
const { v4: uuidv4 } = require('uuid');



// create upcoming schedule
const upcomingSchedule = async (req, res) => {
    var appointmentId = uuidv4();
    var patientName = req.body.patientName;
    var doctorName = req.body.doctorName;
    
    // Create and save appointment
    let appointmentModel = new Appointment({
        appointmentId: appointmentId,
        doctorName: doctorName,
        patientName: patientName,
        status: 'upcoming'
    });

    try {
        await appointmentModel.save();
        
        // Update patient and doctor with appointment
        await Patient.findOneAndUpdate(
            { name: patientName },
            { $push: { upcomingSchedule: appointmentModel } }
        );
        
        await Doctor.findOneAndUpdate(
            { name: doctorName },
            { $push: { upcomingSchedule: appointmentModel } }
        );
        
        await User.findOneAndUpdate(
            { name: patientName },
            { $push: { upcomingSchedule: appointmentModel } }
        );

        await User.findOneAndUpdate(
            { name: doctorName },
            { $push: { upcomingSchedule: appointmentModel } }
        );

        res.status(201).json({
            status: true,
            message: 'Appointment scheduled successfully',
            data: appointmentModel
        });
    } catch (error) {
        console.log('Error scheduling appointment:', error);
        res.status(500).json({
            status: false,
            message: 'Error scheduling appointments',
        });
    }
}
 

const completedSchedule = async (req,res) => {
    try{
        const appointmentId = req.params.appointmentId
        var patientName = req.body.patientName;
        var doctorName = req.body.doctorName;
        let appointmentModel = new Appointment({
            appointmentId: appointmentId,
            doctorName: doctorName,
            patientName: patientName,
            status: 'completed'
        });

        await Appointment.findOneAndUpdate(
            { appointmentId: appointmentId },
            { $set: { status: 'completed' } }
        );

        await Patient.findOneAndUpdate(
            { name: patientName },
            { $pull: {upcomingSchedule: {appointmentId: appointmentId}}, 
            $push: { completedSchedule: appointmentModel } },
        );

        await Doctor.findOneAndUpdate(
            { name: doctorName },
            { $pull: {upcomingSchedule: {appointmentId: appointmentId}}, 
            $push: { completedSchedule: appointmentModel } },
           
        );

        await User.findOneAndUpdate(
            { name: patientName },
            { $pull: {upcomingSchedule: {appointmentId: appointmentId}}, 
            $push: { completedSchedule: appointmentModel } },
            
        );

        await User.findOneAndUpdate(
            { name: doctorName },
            { $pull: {upcomingSchedule: {appointmentId: appointmentId}}, 
            $push: { completedSchedule: appointmentModel } },
        );

        res.status(200).json({
            status: true,
            message: 'Appointment updated successfully.',
            data: appointmentModel
        });
    }catch(error){
        console.log('Error scheduling appointment:', error);
        res.status(500).json({
            status: false,
            message: 'Error updating appointments',
        });
    }
}
module.exports = {
   upcomingSchedule, completedSchedule, 
}