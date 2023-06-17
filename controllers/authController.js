const UserModel = require("../model/UserModel");
const bcrypt = require("bcryptjs");
const controllerError = require("../utils/controllerError");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config/keys");
const cloudinary=require('../middlewares/cloudinary')

module.exports.register__controller = async (req, res, next) => {
  try {
    const { userName, email, password, confirmPassword ,id} = req.body;
    const pic=await cloudinary.uploader.upload(req.file.path)
   
   

    const userInfo = await UserModel.findOne({ email });

    if (userInfo) {
      return res.status(401).json({
        errors: { user: "User already exists" },
      });
    }
    const hash = await bcrypt.hash(password, 10);
    const user = new UserModel({
      userName,
      id,
      email,
      password: hash,
      profilePicture:pic.secure_url
    });

    user
      .save()
      .then((userData) => {
        res.status(201).json({
          userData,
        });
      })
      .catch((err) => {
        controllerError(err, res, "Error occurred");
      });
  } catch (error) {
    controllerError(error, res, "Error occurred");
  }
};

//TODO: Login Controller

module.exports.login__controller = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const userInfo = await (await UserModel.findOne({ email }));

    if (!userInfo) {
      return res.status(401).json({
        errors: { userExist: "User not exist Please register and then login again" },
      });
    }

    // console.log(userInfo)
    bcrypt
      .compare(password, userInfo.password)
      .then((result) => {
        if (!result) {
          return res.status(401).json({
            errors: { password: "password not matched" },
          });
        }

        userInfo.password=undefined
        
        const token = jwt.sign({ _id: userInfo._id,name: userInfo.userName,email: userInfo.email,role: userInfo.role }, SECRET_KEY);
        return res.status(200).json({
          userInfo,
          token,
        });
      })
      .catch((err) => {
        controllerError(err, res, "Error occurred");
      });
  } catch (error) {
    controllerError(error, res, "Error occurred");
  }
};


module.exports.getUsersController = async (req, res, next) => {
  try {
    const users = await UserModel.find();

    return res.status(200).json({
      users,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Internal server error",
    });
  }
};


module.exports.updateStatus__controller = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const user = await UserModel.findByIdAndUpdate(
      userId,
      { status: "1" }, // Update the status to 1
      { new: true } // Return the updated document
    );

    if (!user) {
      return res.status(404).json({
        errors: { user: "User not found" },
      });
    }

    res.status(200).json({ message: "User status updated successfully" });
  } catch (error) {
    controllerError(error, res, "Error occurred");
  }
};


module.exports.disapprove__controller = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const user = await UserModel.findByIdAndUpdate(
      userId,
      { status: "2" }, // Update the status to 1
      { new: true } // Return the updated document
    );

    if (!user) {
      return res.status(404).json({
        errors: { user: "User not found" },
      });
    }

    res.status(200).json({ message: "User status updated successfully" });
  } catch (error) {
    controllerError(error, res, "Error occurred");
  }
};




const QuestionModel = require('../model/QuestionModel'); // Import your Question model

module.exports.getQuestionUserStats = async (req, res, next) => {
  try {
    const totalQuestions = await QuestionModel.countDocuments();
    const usersWithStatus1 = await UserModel.countDocuments({ status: "1" });
    const usersWithStatus0 = await UserModel.countDocuments({ status: "0" });

    res.status(200).json({
      totalQuestions,
      usersWithStatus1,
      usersWithStatus0
    });
  } catch (error) {
    controllerError(error, res, "Error occurred");
  }
};