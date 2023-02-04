const mongoose = require("mongoose");
const countSchema=new mongoose.Schema({
    name:{
        type:String,
        required: true,
        unique:true,
    },
    value:{
        type:String,
        required:true,
        default:"0"
    }
})
module.exports= mongoose.model('Counter',countSchema)