require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");  //(use for react js connection)
const connect_db = require("./util/db");
const emp_router=require("./routers/emp_router");
const contact_router = require("./routers/contact_router");
const services_router = require("./routers/services-router");
const admin_router = require("./routers/admin-router");
const errormiddleware = require("./middlewares/error_middleware");
//const { setRandomFallback } = require("bcryptjs");

//tackle CORS error ---------(use for react js connection)
const corsOptions ={
    origin : "http://localhost:5173",
    method : "GET, POST, PUT, DELETE, PATCH, HEAD",
    credentials: true,
}
app.use(cors());
//End ---------------------------

app.use(express.json());

app.use("/api/auth", emp_router);
app.use("/", contact_router);
app.use("/",services_router);
app.use("/",admin_router);

app.use(errormiddleware);

connect_db().then(()=>{
    app.listen(`${process.env.PORT}`,()=>{
        console.log(`server running on port : ${process.env.PORT}`);
    });
});