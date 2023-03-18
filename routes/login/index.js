const express=require('express');
var passport = require('passport');
var LocalStrategy = require('passport-local');
var crypto = require('crypto');
const patientModel = require("../../models/patient");
passport.use(
    new LocalStrategy(
        async function verify(username,password,cb){
            //requesting user to enter email as username
            console.log(username)
            try {
                const userData = await patientModel.findOne({ email: username });
                if (userData!=null&&userData.password === password) {
                    return cb(null, userData);//
                }
                else {
                    return cb(null, false, { message: 'Incorrect username or password.' });
                }
            } catch (error) {
                console.log(error);
                return cb(null, false, { message: 'Incorrect username or password.' });
            }
        }
    )
);
const loginRouter=new express.Router();
loginRouter.get('/', (req, res) => {
    res.render("./login/patient")
})
loginRouter.get('/doctor',(req,res)=>{
    res.render("./login/doctor")
})
loginRouter.post("/patient", passport.authenticate('local',{
    successRedirect: '/success',
    failureRedirect: '/failure'
}),async (req, res) => {

    try {
        const userData = await patientModel.findOne({ email: req.body.email });
        if (userData.password === req.body.password) {
            res.send(userData);
        }
        else {
            res.send("Check credentials");
        }
    } catch (error) {
        console.log(error)
        res.send("Check credentials");
    }
})
module.exports=loginRouter;
