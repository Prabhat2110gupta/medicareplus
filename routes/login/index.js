const express=require('express');
const passport=require("passport");
const loginRouter=new express.Router();
loginRouter.get('/', (req, res) => {
    res.render("./login/patient")
})
loginRouter.get('/doctor',(req,res)=>{
    res.render("login/doctor")
})
loginRouter.post("/patient", passport.authenticate('doctor',{
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
