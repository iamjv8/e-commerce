const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/User");
const router = express.Router();

//Signup User
router.post("/signup", async (req, res) => {
  const data = new UserModel({
    name: req.body.name,
    age: req.body.age,
    email: req.body.email,
    password: req.body.password,
  });
  try {
    const dataToSave = await data.save();
    res.status(200).json(dataToSave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Login User
router.post("/login", async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });
    if (user && bcrypt.compareSync(req.body.password, user.password)) {
      const dataForToken = {
        email: user.email,
        id: user._id,
      };
      res.status(200).json({
        message: "Login Successful.",
        status: true,
        token: jwt.sign(dataForToken, process.env.JWT_SECRET),
      });
    } else {
      res.status(200).json({ error: "Credentials did not matched" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Get all Method
router.get("/getAll", async (req, res) => {
  try {
    const data = await UserModel.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
