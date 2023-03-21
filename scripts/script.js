const mongoose = require("mongoose");
async function mongo() {
    await mongoose.connect("mongodb://127.0.0.1:27017/med_register", {}).then(() => { //don't use localhost here (didn't work in linux,failed to connect)
        console.log(`Mongoose connected`);
    }).catch((e) => {
        console.log(e.reason);
        console.log(`Mongoose not connected`);
    });
    const doctorModel = require("../models/doctor");
    const doctorData = require('./doctor');
    // console.log(doctorData);
}

mongo();