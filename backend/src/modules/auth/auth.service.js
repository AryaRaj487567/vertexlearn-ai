const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../users/user.model");

const registerUser = async ({ name, email, password, role }) => {
  // Check if email already exists
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new Error("User already exists");
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role,
  });

  const userResponse = user.toObject();
  delete userResponse.password;
  return userResponse;;
};

module.exports = {
  registerUser,
};