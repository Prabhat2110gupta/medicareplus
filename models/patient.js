const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
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
        required: false,
    },
    documents: [{
        file: {
            type: String,
            required:true
        },
        date: {
            type: String,
            required: true,
            default:Date.now
        },
        description:{
            type: String,
            required:true,
        }
    }]

})

module.exports = mongoose.model('PatientRecords', patientSchema);