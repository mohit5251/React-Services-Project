const {Schema,model} = require("mongoose");

const contact_schema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    message:{
        type:String,
        required:true
    },
});

const contactus = new model("contactus",contact_schema);

module.exports = contactus;