const mongoose = require("mongoose");
const testSchema = new mongoose.Schema({
    name:{
        type:String
    },
    documents: [{
        file: {
            type: String,
            required: true
        },
        date: {
            type: String,
            required: true,
            default: Date.now
        },
        description: {
            type: String,
            required: true,
        }
    }]
});
module.exports = mongoose.model('test',testSchema);