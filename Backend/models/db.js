import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()
const mongo_url = process.env.MONGO_CONN

const connectDb = async ()=>{ 
    mongoose.connect(mongo_url)
  .then(()=>{
     console.log('mogobd connected')
  }).catch((err)=>{
     console.log("mongo db error",err)
  })}

export default connectDb