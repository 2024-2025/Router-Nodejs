const { default: mongoose } = require('mongoose');


const UserSchema = new mongoose.Schema({
    CrudID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    Name: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true
    },
    Password: {
        type: String,
        required: true
    },
    Status: {
        type: String,
        required: false,
        default: "Active"
    },
    Date: {
        type: Date,
        required: false,
        default: new Date
    }
})


const UserModel = mongoose.model('User', UserSchema);





module.exports=UserModel