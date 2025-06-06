const express = require("express");
const router = express.Router();
const {getallusers, deleteuser, getuserByid, updateuser, getAllContact, deleteContact, getContactById, updateContact} = require("../controllers/admin-controller");

const authmiddleware = require("../middlewares/auth-middleware");
const adminMiddleware = require("../middlewares/admin-middleware");

router.route("/users").get(authmiddleware, adminMiddleware, getallusers);

router.route("/users/:id").get(authmiddleware, adminMiddleware, getuserByid); //part 1 of update

router.route("/users/update/:id").patch(authmiddleware, adminMiddleware, updateuser) //part 2 of update

router.route("/users/delete/:id").delete(authmiddleware, adminMiddleware, deleteuser);



// contact admin logics

router.route("/getContact").get(authmiddleware, adminMiddleware, getAllContact);
router.route("/contact/delete/:id").delete(authmiddleware, adminMiddleware, deleteContact);
router.route("/contact/:id").get(authmiddleware, adminMiddleware, getContactById);
router.route("/contact/update/:id").patch(authmiddleware, adminMiddleware, updateContact);

module.exports = router;