const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
    path: {
        type: String,
        required: [true, "path is required"],
    },
    originalName: {
        type: String,
        required: [true, "Original name is required"],
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users', //reference to user table
        required: [true, "User is required"],

    }
})


const file = mongoose.model('file', fileSchema);

module.exports = file;