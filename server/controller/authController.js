const bcrypt = require("bcrypt");
const userModel = require("../model/model.js");

const authRegisterController = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Validate input data here

    const hashedPassword = await bcrypt.hash(password, 8);

    const new_user = await new userModel({
      username,
      email,
      password: hashedPassword,
    }).save();

    res.status(201).send({
      success: true,
      message: "User Register Successfully",
      new_user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error in Register",
      error: error.message,
    });
  }
};

const authLoginController = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validate input data here

    const getdata = await userModel.findOne({ username });

    if (!getdata) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    const passwordMatch = await bcrypt.compare(password, getdata.password);

    if (passwordMatch) {
      res.status(201).send({
        success: true,
        message: "User login Successfully",
        getdata,
      });
    } else {
      res.status(401).send({
        success: false,
        message: "Invalid username or password",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "An error occurred during login",
      error: error.message,
    });
  }
};

module.exports = { authRegisterController, authLoginController };
