const Joi = require('joi')
const mongoose = require('mongoose')

const ImageSchema = new mongoose.Schema({
    image:String,
    Name:String


})

const ImageModel = mongoose.model('image', ImageSchema)

const ImageValidation = (uv) => {
    let imagevalidation = Joi.object({

       
        Name: Joi.string().required(),
    })

    return imagevalidation.validate(uv)
}

module.exports =
{
    ImageModel,
    ImageValidation
}