import User from "../models/user.js";
import bcrypt from "bcrypt";

export const registerUser = async (req, res) => {
  const { fname, lname, email, password } = req.body;
  console.log("Request received with data:", req.body);

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400).json({ message: "user has already registered" });
    }

    const hashedpwd = await bcrypt.hash(password, 10);

    // create new user

    const user = new User({
      firstname:fname,
      lastname:lname,
      email,
      password : hashedpwd
    });

    // user is saved into the database
    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "error", error: error.message });
  }
};
