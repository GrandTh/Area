const mongoose = require('mongoose')
const Schema = mongoose.Schema

const User = new Schema(
    {
        username: {
            type: String,
            required: true,
            minLength: 3,
            maxLength: 55,
            unique: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            lowercase: true,
            unique: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
            max: 1024,
            minlength: 6
        },
        picture: {
            type: String,
        },
    },
    { timestamps: true },
)

module.exports = mongoose.model('users', User)
