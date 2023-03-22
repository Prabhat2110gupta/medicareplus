const express=require('express');
const router= new express.Router;
const {patientModel,doctorModel} = require("../../models/");



router.get('/', (req, res) => {
    res.render("registration/doctor");
})
router.post("/new/patient", (req, res) => {
    console.log(req.body.email)
    console.log(req.body.password)
    const obj = {
        email: req.body.email,
        password: req.body.password,
        name: req.body.name,
        date_of_birth: req.body.date_of_birth,
        phone_number: req.body.phone_number,
        gender: req.body.gender,
        address: req.body.address,
    }
    //validation
    try {
        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(obj.email)) throw 'Email Invalid';
        if (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(obj.password)) throw 'Password invalid';
        // password must contain at least eight characters, at least one number and both lower and uppercase letters and special characters
        if (!/^[a-z ,.'-]+$/i.test(obj.name)) throw 'Name invalid';
        if (!/\+?\d[\d -]{8,12}\d/.test(obj.phone_number)) throw 'phone number invalid';

        const newPatient = new patientModel(obj);

        newPatient.save();
        res.send("jii")

    }
    catch (error) {
        res.send(error);
        console.log(obj)
    }

})

router.get("/", (req, res) => {
    res.render("registration/doctor");
})
router.post("/", async (req, res) => {
    const obj = {
        email: req.body.email,
        password: req.body.password,
        name: req.body.name,
        date_of_birth: req.body.date_of_birth,
        phone_number: req.body.phone_number,
        gender: req.body.gender,
        address: req.body.address,
        speciality: req.body.speciality,
        qualification: req.body.qualification,
    }
    try {
        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(obj.email)) throw 'Email Invalid';

        // if (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(obj.password)) throw 'Password invalid';
        // password must contain at least eight characters, at least one number and both lower and uppercase letters and special characters
        if (!/^[a-z ,.'-]+$/i.test(obj.name)) throw 'Name invalid';
        if (!/\+?\d[\d -]{8,12}\d/.test(obj.phone_number)) throw 'phone number invalid';
        if (!/[a-z .]{3,50}/i.test(obj.speciality)) throw 'speciality invalid';
        if (!/[a-z .]{3,50}/i.test(obj.qualification)) throw 'qualification invalid';
        console.log(obj)
        // console.log(req.body)
        const user = await doctorModel.find({ email: obj.email });
        if (user.length) throw "email already exists";

    }
    catch (error) {
        res.send(error);
        return;
        // console.log(obj)
    }
    finally {
        const newDoctor = new doctorModel(obj)
        newDoctor.save().then((T) => {
            res.send("Account added")
        }, (reason) => {
            res.send("Please try with different name or mail id")
            // console.log(reason)
        })
    }

})
module.exports=router;