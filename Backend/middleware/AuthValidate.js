import joi from 'joi'

const signupValidation =(req,res,next)=>{
    const schema = joi.object({
       firstName: joi.string().required(),
    lastName: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().min(6).required()
    })
    const{error}=schema.validate(req.body)
    if(error){
         return res.status(400).json({message:'bad request',error})
    }
    next()
}

const loginValidation =(req,res,next)=>{
    const schema = joi.object({
      
        email: joi.string().email().required(),
        password: joi.string().min(4).max(100).required(),

    })
    const{error}=schema.validate(req.body)
    if(error){
         return res.status(400).json({message:'bad request',error})
    }
    next()
}

export  {signupValidation,loginValidation}