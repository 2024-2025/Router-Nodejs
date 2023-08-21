const express = require('express');
const Joi = require('joi');
const bcrypt = require('bcrypt')

const router = express.Router();

const UserModel = require('./UserModel')




router.get('/', async (req, res) => {

    let find = await UserModel.find().populate({
        path: "CrudID",
        model: "crud",
        select: "-_id Name Phone"
    })
    res.send(find)


})
router.get('/:id', async (req, res) => {

    let { id } = req.params;
    let find = await UserModel.findById(id)

    res.send(find)


})



router.post('/', async (req, res) => {

    let { error } = UserValidation(req.body)
    if (error) return res.send(error.message)
    let Insert = new UserModel(req.body)

    let salt = await bcrypt.genSalt(10)
    Insert.Password = await bcrypt.hash(Insert.Password, salt);



    let info = await Insert.save()

    res.send({
        status: "Success",
        message: "Successfully Inserted User",
        info: info
    })

})





router.put('/:id', async (req, res) => {

    let { id } = req.params;
    let find = await UserModel.findByIdAndUpdate(id, req.body, { new: true })
    let salt = await bcrypt.genSalt(10)
    find.Password = await bcrypt.hash(find.Password, salt);

    let info = await find.save()
    res.send({
        status: "Success",
        message: "Successfully Update User",
        info: info
    })


})
router.delete('/:id', async (req, res) => {

    let { id } = req.params;
    let find = await UserModel.findByIdAndDelete(id)

    res.send({
        status: "Success",
        message: "Successfully Delete User",
        info: find
    })


})




const UserValidation = (uv) => {
    let usevalidation = Joi.object({
        CrudID: Joi.string().required(),
        Name: Joi.string().required(),
        Email: Joi.string().required().email(),
        Password: Joi.string().required(),
    })

    return usevalidation.validate(uv)
}


module.exports = router
