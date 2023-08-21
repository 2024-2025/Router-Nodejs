const express = require('express');

const joi = require('joi');

const jwt = require('jsonwebtoken');

const bcrypt = require('bcrypt');


const router = express.Router();

const UserModel = require('./UserModel')





router.post('/', async (req, res) => {

    let { error } = LoginValidation(req.body)
    if (error) return res.send(error.message)

    const UserData = await UserModel.findOne({ Email: req.body.Email })
    if (!UserData) return res.send("Email in Correct")

    const Checkpass = await bcrypt.compare(req.body.Password, UserData.Password)
    if (!Checkpass) return res.send("Password in Correct")



    const token = jwt.sign({
        id: UserData._id,
        Name: UserData.Name,
        Status: UserData.Status

    }, process.env.Token)

    

    res.header("token", token).json({

        status: "Success",
        message: "Successfully login In",
        token: token

    })
})




const LoginValidation = (lv) => {
    let loginvalidation = joi.object({
        Email: joi.string().email().required(),
        Password: joi.string().required()
    })

    return loginvalidation.validate(lv)
}

module.exports = router;