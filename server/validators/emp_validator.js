const {z} = require("zod");

//creating an object schema 
const registerschema = z.object({
    name: z
    .string({required_error : "name is required"})
    .trim()
    .min(3,{message:"name must be atleast of 3 char"})
    .max(255,{message:"name must be smaller than 255 char"}),

    email: z
    .string({required_error: "email is required"})
    .trim()
    .email({message:"invalid email format"})
    .min(3,{message:"email must be atleast of 3 char"})
    .max(255,{message:"email must be smaller than 255 char"}),

    phone: z
    .string({required_error: "phone number is required"})
    .trim()
    .min(10,{message:"phone no must be atleast of 10 digit"})
    .max(12,{message:"phone no must be smaller than 12 digit"}),

    pass: z
    .string({required_error: "password is required"})
    .trim()
    .min(7,{message:"password must be atleast of 7 char"})
    .max(255,{message:"password must be smaller than 255 char"}),
});

module.exports = registerschema;
