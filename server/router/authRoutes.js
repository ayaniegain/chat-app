const express = require("express");
let router = express.Router();

const {authRegisterController,authLoginController} = require("../controller/authController");

router.post("/register",authRegisterController )
router.post("/login",authLoginController )

module.exports=router