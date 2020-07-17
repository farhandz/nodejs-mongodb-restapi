require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true})
const db = mongoose.connection

db.on('error', (error)=> {
    console.log(error)
})

db.once('open', ()=> {
    console.log('database has been conected')
} )

app.use(express.json())

const suscriberRouter = require('./routes/suscriber')
app.use('/suscriber', suscriberRouter)

app.listen(3000, ()=>{
    console.log('server listen on port 3000')
})

