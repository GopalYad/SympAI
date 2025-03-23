import User from "../models/User.js";
import Doctor from "../models/Doctor.js";


//get all users
const getUsers = async (req, res) => {
    try {
      const users = await User.find().select('-password');
      
      res.status(200).json({
        success: true,
        count: users.length,
        data: users
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Server Error',
        error: error.message
      });
    }
  };
//get all doctors including unapproved doctors
const getAllDoctors = async (req, res) => {
    try {
      const doctors = await Doctor.find().populate({
        path: 'user',
        select: 'name email phone isApproved'
      });
      
      res.status(200).json({
        success: true,
        count: doctors.length,
        data: doctors
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Server Error',
        error: error.message
      });
    }
  };

//update approved status of doctor
const approveDoctor = async (req, res) => {
    try {
      const doctor = await Doctor.findById(req.params.id).populate('user');
      
      if (!doctor) {
        return res.status(404).json({
          success: false,
          message: 'Doctor not found'
        });
      }
      
      // Update user isApproved status
      await User.findByIdAndUpdate(
        doctor.user._id,
        { isApproved: true }
      );
      
      res.status(200).json({
        success: true,
        message: 'Doctor has been approved'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Server Error',
        error: error.message
      });
    }
  };
 //get uses by id
const getUserById = async (req, res) => {
    try {
      const user = await User.findById(req.params.id).select('-password');
      
      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User not found'
        });
      }
      
      res.status(200).json({
        success: true,
        data: user
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Server Error',
        error: error.message
      });
    }
  };  


//delete user
const deleteUser = async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      
      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User not found'
        });
      }
      
      // If user is a doctor, delete doctor profile as well
      if (user.role === 'doctor') {
        await Doctor.findOneAndDelete({ user: req.params.id });
      }
      
      await User.findByIdAndDelete(req.params.id);
      
      res.status(200).json({
        success: true,
        message: 'User deleted successfully'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Server Error',
        error: error.message
      });
    }
  }; 

  export { getUsers, getUserById, deleteUser, getAllDoctors, approveDoctor};
    