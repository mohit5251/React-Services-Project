const contactus = require("../models/contactus_model");

const insert = async(req,res) => {

    try {
        const {name,email,message} = req.body;

        const response = await contactus.create({name,email,message});
        console.log(response);
        return res.status(200).json({msg : "contact send successful"});

    } catch (error) {
        console.log(error);
    }
};



module.exports = {insert};