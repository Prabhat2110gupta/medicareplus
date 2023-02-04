const express = require('express');
const router = express.Router()
router.get("/home", (req, res) => {
    res.render("index")
})
pm=require("../models/patient");
console.log(pm.find())
