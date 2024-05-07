require('dotenv').config()
const express = require('express');
const app = express()
const {rateLimit} = require('express-rate-limit')
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const Auth = require('./routes/auth')



mongoose.connect(process.env.MONGO_URI).then(()=>{
     console.log('Connected')
}).catch(err=>{
    throw new Error(err)
})


const limiter = rateLimit({
	windowMs: 1 * 60 * 1000, 
	limit: 20,
})

app.use(limiter);
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(
    cors({
      origin: '*',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      credentials: true,
    })
  );


  app.use(Auth)

app.listen(process.env.PORT,()=>{
    console.log(`Server Started at ${process.env.PORT}`)
})