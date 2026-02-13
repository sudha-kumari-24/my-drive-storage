const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,


        minlength: [3, 'Name must be 3 character long']

    },
    phone: {
        type: Number,
        required: true,
        trim: true,
        minlength: [10, 'Phone must be 10 character'],
        maxlength: [13, 'Phone max can be 13 character long'],

    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true,
        minlength: [13, 'Email must be 13 character']

    },
    password: {
        type: String,
        required: true,
        trim: true,

        minlength: [6, 'Pass must be min 6 character']

    },

    remember: {
        type: Boolean,
    },


})



const userModel=mongoose.model('user',userSchema);

module.exports=userModel;