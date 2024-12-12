// External Imports
const express = require("express");
const { addPeople, processLogin } = require("../controllers/loginController");

const router = express.Router();

// Register Route - Add People
router.post("/addPeople", addPeople);

// Login Route
router.post("/", processLogin);

module.exports = router;
