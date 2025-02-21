import UserModel from '../models/users.js'
import bcrypt from 'bcrypt'

const signup =async (req,res)=>{
   try{
     const{firstName,lastName,email,password}=req.body;
     const user = await UserModel.findOne({email})
     if(user){
        return res.status(409)
               .json({message:'user alread existed,Login please',success:false})
     }
     const usermodel = new UserModel({firstName,lastName,email,password})
     usermodel.password = await bcrypt.hash(password,10)
     await usermodel.save()
     res.status(201)
        .json({message:'signup successfull',success:true})
   }catch(error){
      res.status(500)
         .json({message:'inter sever error' , success:false})
   }
}

export {signup}