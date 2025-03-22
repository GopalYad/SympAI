import express from 'express'
import 'dotenv/config'

const Port=process.env.PORT || 5000
const app = express()

app.listen(Port, () => {    
    console.log(`Server is running on port ${Port}`)
})
