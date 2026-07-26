const { registerUser, loginUser } = require("./auth.service");

const register = async (req, res) => {
  try {
    const user = await registerUser(req.body);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: user,
    });

  } catch (error) {

    res.status(400).json({
      success: false,
      message: error.message,
    });

  }
};

const login = async (req, res) => {

    try {

        const data = await loginUser(req.body);

        res.status(200).json({
            success: true,
            message: "Login successful",
            data,
        });

    } catch (error) {

        res.status(401).json({
            success: false,
            message: error.message,
        });

    }

};

module.exports = {
  register,
  login,
};