const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema(
    {
        username: {
            type: String,
            required: true
        },
        password : {
            type: String,
            required: true
        },
        firstname: {
            type: String,
            required: true
        },
        lastname : {
            type: String,
            required: true
        },
        isAdmin : {
            type: Boolean,
            default: false,
        },
        profilePicture: String,
        coverPicture: String,
        about: String,
        livesIn: String,
        worksAt: String,
        country: String,
        relationship: String,
        followers: [] ,
        following: []
    },
    {timestamps: true}
)

const User = mongoose.model('User', UserSchema)

module.exports = User



