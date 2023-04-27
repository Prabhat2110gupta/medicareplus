const {Router} = require('express');
const appointmentsRouter = require('./appointments');
const dashboardRouter=Router();
dashboardRouter.use("/appointments",appointmentsRouter);
module.exports=dashboardRouter;