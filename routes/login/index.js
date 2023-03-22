const express = require('express');
const passport = require("passport");
const loginRouter = new express.Router();
// const { patientModel } = require('../../models')
loginRouter.get('/patient', (req, res) => {
    res.render("./login/patient")
})
loginRouter.post("/patient", passport.authenticate('patient', {
    successRedirect: '/success',
    failureRedirect: '/failure'
}));
loginRouter.post("/doctor", passport.authenticate('doctor', {
    successRedirect: '/success',
    failureRedirect: '/failure',
}));
loginRouter.get('/doctor', (req, res) => {
    res.render("login/doctor")
});
module.exports = loginRouter;
