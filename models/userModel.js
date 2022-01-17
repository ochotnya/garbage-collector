const mongoose=require('mongoose')

const userSchema = new mongoose.Schema({
    userID:{
        type: String,
        required:true
    },
    password:{
        type: String,
        required:true,
        select: false
    },
    name:{
        type: String,
        required:true
    },
    department:{
        type: String,
        required:true
    },
    position:{
        type: String,
        required:true
    }
})
module.exports = mongoose.model('User', userSchema)