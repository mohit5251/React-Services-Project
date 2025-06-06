const emp=require("../models/emp_model");
const bcrypt=require("bcryptjs");


// *---------------------------
// * REGISTER Logic
// *---------------------------
const register = async (req,res)=>{

    try {
        const {name,email,phone,pass}=req.body;

        //check if email already exist
        const email_exist=await emp.findOne({email});

        if(email_exist){
            return res.status(400).json({message : "email already exists"});
        }

        //hash password
        // const salt = 10;
        // const hash_pass = await bcrypt.hash(pass,10);

        const response = await emp.create({name,email,phone,pass});
        console.log(response);
        return res.status(201).json({msg : "registration successfull", token : await response.generateToken(), userId : response._id.toString()});

    } catch (error) {
        console.log(error);
    }

};


// *---------------------------
// * LOGIN Logic
// *---------------------------
const login = async (req,res)=>{

    try {
        const{email,pass} = req.body;

        const emp_exist = await emp.findOne({email});
        
        if(!emp_exist){
            return res.status(400).json({message : "email doesn't exist"});
        }
        
        //const user = await bcrypt.compare(pass,emp_exist.pass);  *-- directly
        const user = await emp_exist.comparepass(pass);     // using function in model

        if(user){
            return res.status(201).json({
                msg : "login successfull",
                token : await emp_exist.generateToken(),
                userId : emp_exist._id.toString()});
        }
        else{
            return res.status(401).json({message : "password doesn't match"});
        }

    } catch (error) {
        return res.status(500).json({message : "server error"});
    }
};



// *---------------------------
// * send User data to front end (react js)
// *---------------------------
// const user = async(req, res) =>{  
//     try {
//         const userData = req.user;
//         console.log(userData);
//         res.status(207).json({userData});
//     } catch (error) {
//         console.log(error);
//     }
// }

// Send user data to frontend
const user = async (req, res) => {
    try {
        const userData = req.user; // Assuming req.user is populated by a middleware
    
        console.log("User data:", userData);
        res.status(200).json({ userData }); // Use 200 for successful responses
    } catch (error) {
        console.error("Error fetching user data:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};


module.exports = {register,login,user};