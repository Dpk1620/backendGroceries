const mongo = require('mongoose')

const userSchema = mongo.Schema({
    firstName: String,
    lastName: String,
    email: {
        type: String,
        unique: true
    },
    password: String,
    profileImage: String,
    confirmPassword: String


})
const userModel = mongo.model('user', userSchema)
module.exports = userModel