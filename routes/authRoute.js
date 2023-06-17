const {
  login__controller,
  register__controller,
  updateStatus__controller,
  disapprove__controller,
  getQuestionUserStats,
  
  getUsersController

} = require("../controllers/authController");
const { login_validator} = require("../middlewares/loginValidator");
const registerValidator = require("../middlewares/registerValidator");
const loginValidator = require("../middlewares/loginValidator");


const express = require('express');




const router = require("express").Router();

router.post("/login", loginValidator,login_validator,login__controller)

const upload = require("../middlewares/multer");



router.post("/register", upload.single('profilePicture'),registerValidator, registerValidator.register_validator ,register__controller)
router.put("/update-status/:userId",updateStatus__controller);
router.put("/disapprove/:userId",disapprove__controller);
router.get('/stats', getQuestionUserStats);
router.get('/users', getUsersController);

module.exports = router;
