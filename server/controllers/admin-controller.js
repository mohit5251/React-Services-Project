const emp = require("../models/emp_model");
const contactus  = require("../models/contactus_model");

// *---------------------------
// * Get All user data Logic
// *---------------------------
const getallusers = async (req, res) => {
    try {
        const users = await emp.find({}, { pass: 0 });
        console.log(users);

        if (!users || users.length === 0) {
            return res.status(404).json({ message: "No Users found" });
        }

        // Responding directly with the users array instead of nesting under "message"
        return res.status(200).json(users); 
    } catch (error) {
        next(error);
    }
};



// *---------------------------
// * Get single user By ID Logic (Part 1 of update)
// *---------------------------
const getuserByid = async(req, res) =>{
    try {
        const id = req.params.id;
        const data = await emp.findOne({ _id : id}, { pass : 0 });
        return res.status(200).json(data);

    } catch (error){
        next(error); 
    }
} 


// *---------------------------
// * Update user Logic (Part 2 of update)
// *---------------------------
const updateuser = async(req, res) =>{
    try {
        const id = req.params.id;
        const data = req.body;  //get data to update from user front end

        const updatedData = await emp.updateOne(
            { _id : id },   //filter (where)
            { $set : data }    //data to update     
        );
        return res.status(200).json(updatedData);

    } catch (error){
        next(error);
    }
} 



// *---------------------------
// * Delete User Logic
// *---------------------------
const deleteuser = async(req, res) =>{
    try {
        const id = req.params.id;
        await emp.deleteOne({ _id : id});
        return res.status(200).json({message: "User deleted Successfully! "});

    } catch (error){
        next(error);
    }
}



// *---------------------------
// * Get All Contact data Logic
// *---------------------------

const getAllContact = async(req, res) => {
    try {
        const response = await contactus.find();
        if(!response ||  response.length === 0 )
        {
            return res.status(400).json({message : "No contacts found"});
        }
        return res.status(200).json(response);
    } catch (error) {
        next(error);
    }
}

// *---------------------------
// * Delete Contact data Logic
// *---------------------------
const deleteContact = async(req, res) => {
    try {
        const id = req.params.id;
        await contactus.deleteOne({ _id : id});
        return res.status(200).json({message : "Contact Deleted Successfully"});
    } catch (error) {
        next(error);
    }
}

// *---------------------------
// * Get Contact data BY ID
// *---------------------------
const getContactById = async (req, res) =>{
    try {
        const id = req.params.id;
        const data = await contactus.findOne({_id : id});
        console.log(data);
        return res.status(200).json(data);
        
    } catch (error) {
        next(error);
    }
}

const updateContact = async(req, res) =>{
    try {
        const id = req.params.id;
        const data = req.body;

        const updatedData = await contactus.updateOne({_id : id}, {$set : data});
        console.log("After update data ",updatedData);
        
        return res.status(200).json(updatedData);

    } catch (error) {
        next(error);
    }
}

module.exports = {getallusers , deleteuser, getuserByid, updateuser, getAllContact, deleteContact, getContactById, updateContact};
