import express from 'express'
import dotenv from 'dotenv'
import connectDb from './models/db.js'
import bodyParser from 'body-parser'
import cors from 'cors'
import Auth from './routes/AuthRouter.js'
connectDb()
dotenv.config()
const app = express()
app.use(bodyParser.json())
app.use(cors())
app.use('/auth',Auth)

const PORT= process.env.PORT || 8080
app.listen(PORT,()=>console.log(`something is cooking on ${PORT}`))