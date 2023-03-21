
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const logger = require('morgan');
const multer = require('multer');
const counters = require("./models/counters");
require("./resources/passportAuth")

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
app.set('view engine', 'hbs');
app.use(express.static(static_path));



const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/med_register", {}).then(() => { //don't use localhost here (didn't work in linux,failed to connect) 
    console.log(`Mongoose connected`);
}).catch((e) => {
    console.log(e.reason);
    console.log(`Mongoose not connected`);
})


const indexRouter = require('./routes');
app.use("/", indexRouter);


module.exports = app