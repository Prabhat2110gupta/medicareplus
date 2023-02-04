const express=require('express');
const router=new express.Router()
const patientModel = require("../models/patient");
router.get('/login/patient/', (req, res) => {
    res.render("./login/patient")
})
router.get('/login/doctor',(req,res)=>{
    res.render("./login/doctor")
})
router.post("/login/patient", async (req, res) => {
    try {
        const userData = await patientModel.findOne({ email: req.body.email });
        if (userData.password === req.body.password) {
            res.send(userData);
        }
        else {
            res.send("Check credentials");
        }
    } catch (error) {
        res.send("Check credentials");
    }
})
module.exports=router;
