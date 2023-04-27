const bodyParser = require("body-parser");
const { Router } = require("express");

const appointmentsRouter=Router();
appointmentsRouter.use(bodyParser.json())

appointmentsRouter.get("/",function(req,res){
    res.render("dashboard/doctor_sets_timings.hbs",)
})
appointmentsRouter.post("/book",function(req,res){
    res.send(req.body.start)
})



module.exports=appointmentsRouter