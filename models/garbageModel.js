const mongoose=require('mongoose')

const garbageSchema = new mongoose.Schema({
    ownerName:{
        type: String,
        required:true,
    },
    sharedTo:{
        type: Array,
        required: true,
        default: []
    },
    removeDate:{
        type: Date,
        required: true,
        default: Date.now()
    },
    createdOn:{
        type: Date,
        required: true,
        default: Date.now()
    },
    createdBy:{
        type: String,
        required:true
    },
    content:{
        type: String,
        required:true
    },
    image:{
        type: String,
        required:false
    },
    file:{
        type: String,
        required:false
    }
})
module.exports = mongoose.models.Garbage || mongoose.model('Garbage', garbageSchema)