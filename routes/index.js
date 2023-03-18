const { Router } = require("express");
const loginRouter = require("./login");
const registrationRouter = require("./registration");

var indexRouter=Router();
indexRouter.get("/success",(req,res)=>{
    res.send("SUCCESS");
});
indexRouter.get("/failure",(req,res)=>{
    res.send("failure".toUpperCase());
});
indexRouter.get("/",(req,res)=>{

res.render("index")
});
indexRouter.use("/login",loginRouter);
indexRouter.use("/registration",registrationRouter);
module.exports=indexRouter;
