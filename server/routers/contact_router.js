const express = require("express");
const {insert} = require("../controllers/contactus_controller");
const router = express.Router();

router.route("/contactus").post(insert);


module.exports = router;