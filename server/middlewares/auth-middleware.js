const jwt = require("jsonwebtoken");
const emp = require("../models/emp_model")

const authmiddleware = async (req,res,next) => {
    const token = req.header("Authorization"); //just like postman header section
    
    if(!token){
        return res.status(400).json({message: "Unauthorized Request, token not provided"});
    }
    const jwtToken = token.replace("Bearer","").trim();
    console.log("token from authmiddlware ",jwtToken);  //here we get the json token
   
    try {

        const isVerified = jwt.verify(jwtToken, process.env.jwt_secret_key);
        
        const empData = await emp.findOne({email : isVerified.email}).select({ pass : 0, });    //we don't want to get password
        
        // console.log(empData);

        req.user = empData;  //  req is an object that contain custom properties we create,
        req.token = token;
        req.userId = empData._id;

        next(); //next is required to write to go to next step
    } catch (error) {
        return res.status(401).json({message : "Unauthorized. invalid token"})
    }
};

module.exports = authmiddleware;




// const jwt = require("jsonwebtoken");
// const emp = require("../models/emp_model");

// const authMiddleware = async (req, res, next) => {
//   const token = req.header("Authorization");

//   if (!token) {
//     return res.status(401).json({ message: "Unauthorized Request, token not provided" });
//   }

//   const jwtToken = token.replace("Bearer", "").trim();

//   try {
//     const isVerified = jwt.verify(jwtToken, process.env.jwt_secret_key);

//     const empData = await emp.findOne({ email: isVerified.email }).select({ pass: 0 });

//     if (!empData) {
//       return res.status(404).json({ message: "Employee not found" });
//     }

//     req.user = empData;
//     req.token = token;
//     req.userId = empData._id;

//     next();
//   } catch (error) {
//     return res.status(401).json({ message: "Unauthorized. Invalid token" });
//   }
// };

// module.exports = authMiddleware;