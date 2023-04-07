const { Router } = require("express");

const testRoute=Router()

module.exports=testRoute;
testRoute.get("/doctor_sets_timings",(req,res)=>{
    res.render("dashboard/doctor_sets_timings");
})