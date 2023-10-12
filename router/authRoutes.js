const express = require("express");
let router = express.Router();

const {authRegisterController,authLoginController,setAvatarController} = require("../controller/authController");

router.post("/register",authRegisterController )
router.post("/login",authLoginController )
router.post("/setavatar/:id", setAvatarController);

module.exports=router