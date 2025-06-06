const {z, object} = require("zod");

const login_schema = z.object({

    email:z
    .string({required_error: "email is requied"})
    .trim()
    .email({message: "Invalid email format"})
    .min(3,{message: "Email must be atleast of 3 char"})
    .max(255,{message: "Email must be smaller than 255 char"}),

    pass:z
    .string({required_error: "email is requied"})
    .trim()
    .min(7,{message: "password must be atleast of 7 char"})
    .max(255,{message: "password must be smaller than 255 char"}),
});

module.exports = login_schema;