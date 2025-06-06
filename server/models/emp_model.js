const mongoose=require("mongoose");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");

const emp_schema = new mongoose.Schema({

    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    pass:{
        type:String,
        required:true
    },
    isAdmin:{
        type:Boolean,
        default:false
    }

});

//secure password using bcryptjs  ** MOST IMP **
emp_schema.pre("save", async function(next){
    //console.log("pre method",this);

    const user=this;

    if(!user.isModified('pass')){
        next();
    }

    try {
        const hash_pass = await bcrypt.hash(user.pass, 10);
        user.pass = hash_pass;
    } catch (error) {
        next(error);
    }
});

//compare password
emp_schema.methods.comparepass = async function(pass) {
    return bcrypt.compare(pass,this.pass);
};


//json web token
emp_schema.methods.generateToken = async function() {

    try {
        return jwt.sign({
            userId: this._id.toString(),
            email: this.email,
            isAdmin: this.isAdmin,
        },
        process.env.jwt_secret_key,
        {
            expiresIn:"30d",
        }
    );
    } catch (error) {
        console.log(error);
    }
};

const emp = mongoose.model("emp",emp_schema);

module.exports = emp;