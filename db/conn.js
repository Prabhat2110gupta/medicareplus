const { default: mongoose } = require("mongoose");

mongoose
mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_URI, {}).then(() => { //don't use localhost here (didn't work in linux,failed to connect) 
    console.log(`Mongoose connected`);
}).catch((e) => {
    console.log(e.reason);
    console.log(`Mongoose not connected`);
})