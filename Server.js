require('dotenv').config()
const express = require('express');
const Server = express();
Server.use(express.json())
const cors = require('cors')
Server.use(cors())

const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
mongoose.connect(process.env.Mongo)
    .then(() => {
        console.log(process.env.MD)
    })
const Crud = require('./App/Crud')
const User = require('./App/User')
const Login = require('./App/Login');
const Image = require('./Image');
const jwt = require('jsonwebtoken');
Server.use('/login', Login)


// Server.use((req, res, next) => {

//     try {
//         const token = req.headers['token']

//         if (!token) return res.send('token ma haysato')
//         const decode = jwt.decode(token, process.env.Token);
//         if (!decode) return res.send('token Xogtiisa waa qalad');
//         const endecode = jwt.verify(token, process.env.Token)
//         next()
//         return endecode

//     } catch (error) {
//         res.send(error.message)

//     }

// })

Server.use('/crud', Crud)


Server.use('/Public' ,express.static('/Public'))

Server.use('/upload', Image)
Server.use('/user', User)


Server.listen(process.env.Port, () => {
    console.log('Server Listen Port ' + process.env.Port)
})

