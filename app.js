require('dotenv').config();
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const multer = require('multer');
const counters = require("./models/counters");

async function getCount(name, change = 0) {

    let count = await counters.findOne({ name: name });

    if (count == null) {
        count = new counters({ name: name })
    }

    let n = BigInt(count.value);
    if (change != 0) {
        n = n + BigInt(change);
        count.value = n.toString();
        count.save();
    }

    return n.toString();
}
const storage = multer.diskStorage({
    destination: "uploads",
    filename: async (req, file, cb) => {
        const count = await getCount("patientDocs", 1);
        cb(null, count + ".pdf");
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
const { readFile, unlink: deleteFile } = require("fs");

const port = process.env.PORT || 8000;


app.use(bodyParser.urlencoded({ extended: true }));

const static_path = (path.join(__dirname, "../public"));
app.set('view engine', 'hbs');
app.use(express.static(static_path));

app.listen(port, () => {
    console.log(`listening to the port at ${port}`);
});

const mongoose = require("mongoose");
const doctorModel = require("./models/doctor");
const patientModel = require("./models/patient");
mongoose.connect("mongodb://localhost:27017/med_register").then(() => {
    console.log(`Mongoose connected`);
}).catch((e) => {
    console.log(`Mongoose not connected`);
})

app.get("/", (req, res) => {
    res.render("index")
})

const loginRoute=require('./routes/login');
app.use("/",loginRoute);


const registrationRoute=require('./routes/registration');
app.use("/",registrationRoute);

// app.get('/registration/patient', (req, res) => {
//     res.render("index")
// })
// app.post("/registration/patient", (req, res) => {
//     console.log(req.body.email)
//     console.log(req.body.password)
//     const obj = {
//         email: req.body.email,
//         password: req.body.password,
//         name: req.body.name,
//         date_of_birth: req.body.date_of_birth,
//         phone_number: req.body.phone_number,
//         gender: req.body.gender,
//         address: req.body.address,
//     }
//     //validation
//     try {
//         if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(obj.email)) throw 'Email Invalid';
//         if (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(obj.password)) throw 'Password invalid';
//         // password must contain at least eight characters, at least one number and both lower and uppercase letters and special characters
//         if (!/^[a-z ,.'-]+$/i.test(obj.name)) throw 'Name invalid';
//         if (!/\+?\d[\d -]{8,12}\d/.test(obj.phone_number)) throw 'phone number invalid';

//         const newPatient = new patientModel(obj);

//         newPatient.save();
//         res.send("jii")

//     }
//     catch (error) {
//         res.send(error);
//         console.log(obj)
//     }

// })

// app.get("/registration/doctor/", (req, res) => {
//     res.render("./registration/doctor");
// })
// app.post("/registration/doctor/", async (req, res) => {
//     const obj = {
//         email: req.body.email,
//         password: req.body.password,
//         name: req.body.name,
//         date_of_birth: req.body.date_of_birth,
//         phone_number: req.body.phone_number,
//         gender: req.body.gender,
//         address: req.body.address,
//         speciality: req.body.speciality,
//         qualification: req.body.qualification,
//     }
//     try {
//         if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(obj.email)) throw 'Email Invalid';

//         if (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(obj.password)) throw 'Password invalid';
//         // password must contain at least eight characters, at least one number and both lower and uppercase letters and special characters
//         if (!/^[a-z ,.'-]+$/i.test(obj.name)) throw 'Name invalid';
//         if (!/\+?\d[\d -]{8,12}\d/.test(obj.phone_number)) throw 'phone number invalid';
//         if (!/[a-z .]{3,50}/i.test(obj.speciality)) throw 'speciality invalid';
//         if (!/[a-z .]{3,50}/i.test(obj.qualification)) throw 'qualification invalid';
//         console.log(obj)
//         // console.log(req.body)
//         const user = await doctorModel.find({ email: obj.email });
//         if (user.length) throw "email already exists";

//     }
//     catch (error) {
//         res.send(error);
//         return;
//         // console.log(obj)
//     }
//     finally {
//         const newDoctor = new doctorModel(obj)
//         newDoctor.save().then((T) => {
//             res.send("Account added")
//         }, (reason) => {
//             res.send("Please try with different name or mail id")
//             // console.log(reason)
//         })
//     }

// })

app.get("/test/", (req, res) => {
    res.render("test");
})

const testSchema = require("./models/test")
app.post("/test/", upload.single("doc"), (req, res) => {
    if (req.fileValidationError) {
        return res.send("please upload a pdf");
    }
    console.log(req.file.path);
    res.send("done");
})
