import express from "express";
const userController = require("./controller");
const router = express.Router();

router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);

module.exports = router;
