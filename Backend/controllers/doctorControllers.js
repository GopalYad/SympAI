//we need to require the doctor and user model
//
import Doctor from '../models/Doctor.js'
import User from '../models/User.js'


//public routes for doctors
//which actually approved by admin
//get all doctors 

const getDoctors = async (req, res) => { 
    try{
    //find all approved doctors
    const doctors = await Doctor.find()
            .populate(
                {
                    path: 'user',
                    select: 'name email phone isApproved',
                    match :{isApproved:true}
                }
            )
       //approved doctors fillter out in all doctors
       const approvedDoctors = doctors.filter(doctor => doctor.user !== null)
       res.status(200).json({
        success: true,
        count: approvedDoctors.length,
        data: approvedDoctors
      });     
    }catch(error){
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
          });
    }
  }

 //public route
 //get single doctor by id
 const getDoctor=async(req,res)=>{
    try{
    const doctor = await Doctor.findById(req.params.id)
           .populate(
            {
                path:'user',
                select:'name email phone isApproved',
            }
           )
           if (!doctor) {
            return res.status(404).json({
              success: false,
              message: 'Doctor not found'
            });
          }
            //if doctor is not approved then return error
            if(!doctor.user.isApproved){
                return res.status(404).json({
                    success: false,
                    message: 'Doctor not found or not approved'
                  });
            }

            res.status(200).json({
                success: true,
                data: doctor
              });

    }catch(error){
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
          });
    }
 }
 const applyDoctor=async(req,res)=>{
    try{
     const existDoctor=await Doctor.findOne({user:req.user._id})
      if(existDoctor){
          return res.status(400).json({
              success: false,
              message: 'You are already a doctor'
            });
      }
      const { specialization, experience, fee, availability, bio, education } = req.body;
    
      const doctor = await Doctor.create({
        user: req.user._id,
        specialization,
        experience,
        fee,
        availability,
        bio,
        education
      });
  
      res.status(201).json({
        success: true,
        data: doctor,
        message: 'Doctor profile created and pending admin approval'
      });

    }catch(error){
     
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
          });
    }
 }

 const updateDoctorProfile=async(req,res)=>{
  try {
    const { specialization, experience, fee, availability, bio, education } = req.body;
    
    let doctor = await Doctor.findOne({ user: req.user._id });
    
    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: 'Doctor profile not found'
      });
    }
    
    // Update fields
    doctor = await Doctor.findByIdAndUpdate(
      doctor._id,
      {
        specialization: specialization || doctor.specialization,
        experience: experience || doctor.experience,
        fee: fee || doctor.fee,
        availability: availability || doctor.availability,
        bio: bio || doctor.bio,
        education: education || doctor.education
      },
      { new: true }
    );
    
    res.status(200).json({
      success: true,
      data: doctor
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
 }
 
 export {getDoctors,getDoctor,applyDoctor,updateDoctorProfile}