const express = require("express");
const {register,login,user} = require("../controllers/emp_controller");
const router = express.Router();

//middleware and validators for validation (topic : ZOD)
const validate = require("../middlewares/validate_middleware");
const registerschema = require("../validators/emp_validator");
const login_Middleware = require("../middlewares/login_middleware");
const login_schema = require("../validators/login_validator");

const authmiddleware = require("../middlewares/auth-middleware"); //authenticate user (react js)

router.route("/register").post(validate(registerschema), register);
router.route("/login").post(login_Middleware(login_schema), login);

router.route("/user").get(authmiddleware, user); //authenticate user (react js) send User data to front end

module.exports = router;