const bcrypt = require("bcrypt");
const userModel = require("../model/model.js");

const authRegisterController = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Validate input data here

    const hashedPassword = await bcrypt.hash(password, 8);

    const existingUser= await userModel.find({username});

    console.log(existingUser);

    if (existingUser) {
      return res.status(404).send({
        success: false,
        message: "duplicate user found",
      });
    }

    const user = await new userModel({
      username,
      email,
      password: hashedPassword,
    }).save();

   

    res.status(201).send({
      success: true,
      message: "User Register Successfully",
      user,
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

    console.log(getdata);

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

const setAvatarController=async (req,res)=>{
  try {
    const userId = req.params.id;
    const avatarImage = req.body.image;
    const userData = await User.findByIdAndUpdate(
      userId,
      {
        isAvatarImageSet: true,
        avatarImage,
      },
      { new: true }
    );
    return res.json({
      isSet: userData.isAvatarImageSet,
      image: userData.avatarImage,
    });
  } catch (ex) {
    next(ex);
  }

}

module.exports = { authRegisterController, authLoginController ,setAvatarController };
