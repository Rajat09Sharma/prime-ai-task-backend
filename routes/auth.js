const express = require("express");
const { loginHandler, signupHandler, refreshTokenHandler, logoutHandler } = require("../controllers/auth");


const router = express.Router();

router.post("/login", loginHandler);
router.post("/signup", signupHandler);
router.post("/logout", logoutHandler);
router.get("/refresh", refreshTokenHandler);




module.exports = { authRouter: router }