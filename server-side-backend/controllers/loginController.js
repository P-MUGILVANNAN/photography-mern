// Internal Imports
const People = require("../models/People");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// JWT Secret Key
const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";

// Add People
async function addPeople(req, res, next) {
  let newPeople = new People(req.body);

  try {
    // Save People to Database
    const result = await newPeople.save();
    res.status(200).json({
      message: "Your Registration was Successful.",
    });
  } catch (err) {
    // Handle unique email constraint error
    if (err.code === 11000) {
      res.status(400).json({
        message: "Email already registered.",
      });
    } else {
      next(err);
    }
  }
}

// Process Login
async function processLogin(req, res, next) {
  try {
    const user = await People.findOne({ email: req.body.email });

    if (user) {
      // Validate password
      const passwordIsValid = await bcrypt.compare(req.body.password, user.password);

      if (passwordIsValid) {
        // Generate JWT
        const token = jwt.sign(
          { _id: user._id, email: user.email, role: user.role },
          JWT_SECRET,
          { expiresIn: "1h" }
        );

        // Send user data and token
        res.status(200).json({
          token,
          userData: { _id: user._id, email: user.email, role: user.role },
          message: "You are logged in successfully.",
        });
      } else {
        res.status(401).json({ message: "Invalid email or password." });
      }
    } else {
      res.status(401).json({ message: "Invalid email or password." });
    }
  } catch (err) {
    next(err);
  }
}

module.exports = {
  addPeople,
  processLogin,
};
