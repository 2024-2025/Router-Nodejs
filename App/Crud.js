const express = require('express');
const { default: mongoose } = require('mongoose');

const router = express.Router();



const joi = require('joi')


const CrudSchema = new mongoose.Schema({

    Name: {
        type: String,
        required: true
    },
    Phone: {
        type: Number,
        required: true
    }

}, { timestamps: true })






const CrudModel = mongoose.model('crud', CrudSchema)



router.get('/', async (req, res) => {

    let find = await CrudModel.find()
    res.send(find)
})
router.get('/:id', async (req, res) => {
    let { id } = req.params;
    let find = await CrudModel.findById(id)
    res.send(find)
})
router.post('/', async (req, res) => {

    try {
        let { error } = Crud(req.body)
        if (error) return res.send(error.message)
        let find = new CrudModel(req.body)
        await find.save()
        res.send({
                status: "Success",
                message: "Successfully Inserted Crud ",
                info: find
            })

        // res.send('welcome')

    } catch (error) {

        res.send(error.message)

    }
})

















router.put('/:id', async (req, res) => {

    try {
        let { id } = req.params;

        let find = await CrudModel.findByIdAndUpdate(id, (req.body), { new: true })

        res.send({
            status: "Success",
            message: "Successfully Update Crud ",
            info: find
        })
    } catch (error) {
        res.send(error.message)

    }
})
router.delete('/:id', async (req, res) => {

    try {
        let { id } = req.params;
        let find = await CrudModel.findByIdAndDelete(id)
        res.send({
            status: "Success",
            message: "Successfully Delete Crud ",
            info: find
        })
    } catch (error) {
        res.send(error.message)

    }
})



const Crud = (cr) => {
    let crud = joi.object({
        Name: joi.string().required(),
        Phone: joi.number().required()

    })

    return crud.validate(cr)
}



module.exports = router;