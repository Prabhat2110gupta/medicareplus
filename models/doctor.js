const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
        //  unique:true
    },
    date_of_birth: {
        type: String,
        required: true,
        // unique:true
    },
    phone_number: {
        type: String,
        required: true,
        unique: true
    },
    gender: {
        type: String,
        required: true,

    },
    address: {
        type: String,
        required:true,
    },
    speciality:{
        type:String,
        required:true,

    },
    qualification:{
        type:String,
        required:true
    }

});

const doctorModel=mongoose.model('DoctorRecords',doctorSchema);
module.exports=doctorModel;