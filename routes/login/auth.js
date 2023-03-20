var passport = require('passport');
var LocalStrategy = require('passport-local');
var crypto = require('crypto');
const patientModel = require("../../models/patient");
passport.use('doctor',
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
module.exports=passport;