const services = require("../models/services_model");

const services_disp = async (req, res) =>{

    try {
        const response = await services.find();
        if(!response)
        {
            res.status(420).json({msg : "not able to fetch services"});
            return;
        }
        res.status(210).json({msg : response});
    } catch (error) {
        console.log(error);   
    }   
};

module.exports = services_disp;