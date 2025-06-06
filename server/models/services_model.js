const mongoose = require("mongoose");

const services_schema = new mongoose.Schema({
    service : {type: String, required: true},
    description : {type: String, required: true},
    price : {type: String, required: true},
    provider : {type: String, required: true},
});

const services_model = new mongoose.model("services", services_schema);

module.exports = services_model;