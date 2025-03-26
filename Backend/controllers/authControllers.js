import 'dotenv/config';

import User from "../models/User.js";
import generateToken from '../utils/token.js';

const register = async (req, res) => { 
    try {
        const {name, email, password, role, phone, address,adminCode} = req.body;

    // Check if email already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: 'User with this email already exists'
      });
    }


    let finalRole = role || 'patient';
    let isApproved = role !== 'doctor';
    
    // If admin role is requested, check the admin code
    if (role === 'admin') {
      // Check if the admin code is valid
      if (adminCode !== process.env.ADMIN_SECRET_CODE) {
        return res.status(401).json({
          success: false,
          message: 'Invalid admin registration code'
        });
      }
      
      // If code is valid, allow admin registration
      isApproved = true;
    }

        const user = await User.create(
            {name, 
            email, 
            password, 
            role :finalRole, 
             phone,
            address,
            isApproved
        });

        const token = generateToken(user._id);


        res.status(201).json({
            success: true,
            data: {
              _id: user._id,
              name: user.name,
              email: user.email,
              role: user.role,
              isApproved: user.isApproved,
              token
            }
          });
        return;
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
          });
    }
    
}

const login = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'Invalid credentials'
        });
      }
  
     
      const isMatch = await user.matchPassword(password);
      if (!isMatch) {
        return res.status(401).json({
          success: false,
          message: 'Invalid credentials'
        });
      }
  
      // Check if doctor is approved
      if (user.role === 'doctor' && !user.isApproved) {
        return res.status(401).json({
          success: false,
          message: 'Your account is pending approval'
        });
      }
      
  
      const token = generateToken(user._id);
  
      res.status(200).json({
        success: true,
        data: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          isApproved: user.isApproved,
          token
        }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Server Error',
        error: error.message
      });
    }
  };

const getProfile=async(req,res)=>{
  try {
    const user = await User.findById(req.user._id).select('-password');
    
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
}

const updateProfile=async(req,res)=>{
  try {
    const { name, phone, address } = req.body;
    
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { 
        name: name || req.user.name,
        phone: phone || req.user.phone,
        address: address || req.user.address
      },
      { new: true }
    ).select('-password');
    
    res.status(200).json({
      success: true,
      data: updatedUser
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
}
export { register, login,getProfile ,updateProfile};


