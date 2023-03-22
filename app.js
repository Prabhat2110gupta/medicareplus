
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const logger = require('morgan');
const multer = require('multer');
require("./resources/passportAuth");
const passport = require('passport');
const mongoose=require('mongoose');
const session = require('express-session');
const SQLiteStore = require('connect-sqlite3')(session);

const storage = multer.diskStorage({
    destination: "uploads",
    filename: async (_req, file, cb) => {
        cb(null, Date.now().toString() + ".pdf");
    }
})
const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype !== "application/pdf") {
            req.fileValidationError = true;
            cb(null, false);
        }
        cb(null, true);
    }
});
const app = express();
app.use(logger('dev'));


app.use(bodyParser.urlencoded({ extended: true }));

const static_path = (path.join(__dirname, "../public"));
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: new SQLiteStore({ db: 'sessions.db', dir: './var/db' })
}));
app.use(passport.authenticate('session'));
app.set('view engine', 'hbs');
app.use(express.static(static_path));

mongoose.set('strictQuery',false);
mongoose.connect(process.env.MONGO_URI, {}).then(() => { //don't use localhost here (didn't work in linux,failed to connect) 
    console.log(`Mongoose connected`);
}).catch((e) => {
    console.log(e.reason);
    console.log(`Mongoose not connected`);
})


const indexRouter = require('./routes');
app.use("/", indexRouter);


module.exports = app