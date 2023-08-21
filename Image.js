const express = require('express')

const multer = require('multer')

const path = require('path');

const router = express.Router()

const { ImageModel, ImageValidation } = require('./App/ImageModel')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        return cb(null, 'Public')
    },
    filename: (req, file, cb) => {
        let imagevalidation = file.fieldname + "_" + Date.now() + path.extname(file.originalname)

        return cb(null, imagevalidation)
    }
})

const upload = multer({
    storage: storage,

    fileFilter: (req, file, cb) => {


        if (
            file.mimetype == "image/jpeg" ||
            file.mimetype == "image/jpg" ||
            file.mimetype == "image/png"

        ) {
            cb(null, true)
        }
        else {

            console.log("You Only Import image png or jpeg")
            return


        }
        {
            cb(null, false)
        }

    },

    limits: {
        fileSize: 1024 * 1024 * 5
    }



}).single('image')


// const upload = multer({
//     storage: storage,

//     // fileFilter: (req, file, cb) => {


//     //     if (
//     //         file.mimetype == "image/jpeg" ||
//     //         file.mimetype == "image/png"

//     //     ) {
//     //         cb(null, true)
//     //     }
//     //     else {

//     //         console.log("You Only Import image png or jpeg")
//     //         return


//     //     }
//     //     {
//     //         cb(null, false)
//     //     }

//     // },

//     limits: {
//         fileSize: 1024 * 1024 * 10
//     }



// }).array('image[]')

router.get('/',async(req,res)=>{

    let finds=await ImageModel.find();
    res.send(finds);
})
router.post('/', upload, async (req, res) => {



    try {

        let { error } = ImageValidation(req.body)
        
        if (error) return res.send(error.message)

      
          

        let Insert = new ImageModel(req.body);
        if(req.file)
        {
            Insert.image=req.file.filename;
        }

       

       

        // if (req.files) {
        //     let path = ''

        //     req.files.forEach((files, index, arr) => {
        //         path = path + files.path + ",";

        //     })

        //     path = path.substring(0, path.lastIndexOf(","))
        //     Insert.image = path;
        // }


       
        let info = await Insert.save()



        res.send({
            status: "Success",
            message: "Successfully Insert Data",
            info: info
        })
    } catch (error) {

        res.send(error.message)

    }

})

module.exports = router;