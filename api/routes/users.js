const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../../models/users");

router.get("/", (req, resp) => {
  User.find()
    .then((result) => {
      console.log(result);
      resp.status(200).json({
        message: "User fetched successfully",
        users: result,
      });
    })
    .catch((err) => resp.status(500).json({ error: err.message }));
});


router.post("/submitForm", (req, resp) => {
  User.find()
    .then((result) => {
      console.log(result);
      resp.status(200).json({
        message: "User fetched successfully",
        users: result,
      });
    })
    .catch((err) => resp.status(500).json({ error: err.message }));
});


router.post("/", async (req, res) => {
  try {
    // Validate request body to ensure all required fields are present and valid
    const { name, email, phoneNumber, intrests, projectRequirements, date } = req.body;

    // Basic validation
    if (!name || !email || !phoneNumber || !intrests || !projectRequirements || !date) {
      return res.status(400).json({ error: "All fields are required." });
    }

    // Create a new User document
    const user = new User({
      _id: new mongoose.Types.ObjectId(),
      name,
      email,
      phoneNumber,
      intrests,
      projectRequirements,
      date
    });

    // Save the user document asynchronously
    const result = await user.save();

    // Respond with a success message and the created user
    res.status(201).json({
      message: "User info saved successfully",
      createdUser: result,
    });
  } catch (error) {
    // Handle errors and send appropriate response
    console.error("Error saving user info:", error);
    res.status(500).json({ error: "Failed to save user info. Please try again later.", errorMessage: error.message });
  }
});

router.get("/:id", (req, resp) => {
  const id = req.params.id;
  User.findById(id)
    .then((result) => {
      if (result != null) {
        resp.status(200).json({
          message: `User with id : ${id} fetched successfullt`,
          user: result,
        });
      } else {
        resp.status(500).json({
          message: `No user present with this id`,
        });
      }
    })
    .catch((err) => resp.status(500).json({ error: err.message }));
});

router.patch("/:id", (req, resp) => {
  const id = req.params.id;
  User.findById(id)
    .then((result) => {
      if (result != null) {
        User.update({ _id: id }, { $set: req.body });
      } else {
        resp.status(500).json({
          message: `No user present with this id`,
        });
      }
    })
    .catch((err) => resp.status(500).json({ error: err.message }));
});

router.delete("/:id", (req, resp) => {
  const id = req.params.id;
  User.findById(id)
    .then((result) => {
      if (result != null) {
        User.remove({ _id: id });
      } else {
        resp.status(500).json({
          message: `No user present with this id`,
        });
      }
    })
    .catch((err) => resp.status(500).json({ error: err.message }));
});

module.exports = router;
