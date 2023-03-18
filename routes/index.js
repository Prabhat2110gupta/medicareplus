const { Router } = require("express");
const loginRouter = require("./login");
const registrationRouter = require("./registration");

var indexRouter=Router();
indexRouter.get("/",(req,res)=>{
res.render("index")
});
module.exports=indexRouter;
indexRouter.use("/login",loginRouter);
indexRouter.use("/registration",registrationRouter)