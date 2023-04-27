var passport = require('passport');
var LocalStrategy = require('passport-local');
var crypto = require('crypto');
const { patientModel, doctorModel } = require("../models/");
passport.use('doctor',
    new LocalStrategy(
        async function verify(username, password, cb) {
            //requesting user to enter email as username
            console.log(username)
            try {
                const userData = await doctorModel.findOne({ email: username });
                if (userData != null && userData.password === password) {
                    userData.type="doctor";
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

passport.use('patient', new LocalStrategy(
    async function verify(username, password, cb) {
        try {
            const userData = await patientModel.findOne({ email: username });
            if (userData != null && userData.password === password) {
                userData.type="patient";
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
));

passport.serializeUser(function (user, cb) {
    process.nextTick(function () {
        cb(null, { email: user.email, username: user.name,type:user.type });
    });
});

passport.deserializeUser(function (user, cb) {
    process.nextTick(function () {
        return cb(null, user);
    });
});