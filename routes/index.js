const { Router } = require("express");
const loginRouter = require("./login");
const registrationRouter = require("./registration");
const testRoute = require("./test_route");

var indexRouter=Router();
indexRouter.get("/success",(req,res)=>{
    res.send(req.isAuthenticated()?"authenticated\n":"not authenticated\n");
    // res.send("SUCCESS");
});
indexRouter.get("/failure",(req,res)=>{
    res.render("message",{message:req.flash})
});
indexRouter.get("/",(req,res)=>{

res.render("index")
});
indexRouter.use("/login",loginRouter);
indexRouter.use("/registration",registrationRouter);
indexRouter.use("/",testRoute);
module.exports=indexRouter;
