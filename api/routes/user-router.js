const express = require("express");
const router = express.Router();
const db = require("../models/user-model");

//=====================================Generic Get all users
router.get("/", async (req, res) => {
  const data = await db.find("users");
  try {
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
});

router.get("/email", (req, res) => {
  const { email } = req.body;

  db.findByEmail(email)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      console.log(err);
    });
});

//--------------------get user by id
router.get("/:id", (req, res) => {
  const user_id = req.params.id;
  db.findById(user_id)
    .then(user => {
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: "user not found" });
      }
    })
    .catch(error => {
      if (error) {
        res.status(500).json({ message: `Error : ${error}` });
      }
    });
});

//=====================================User Property routes
//--------------------get properties by user id
router.get("/:id/properties", async (req, res) => {
  const user_id = req.params.id;
  db.findPropByUser(user_id)
    .then(properties => {
      if (properties) {
        res.status(200).json(properties);
      } else {
        res.status(404).json({
          Message:
            "These properties are lost like the Donner party...sad indeed"
        });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: `The properties seems to be lost try again` });
    });
});
//--------------------get single property by user id

//=======================================Create new user
router.post("/", async (req, res) => {
  try {
    const userData = req.body;
    const checkEmail = await db.findByEmail(userData.email);
    if (!checkEmail) {
      try {
        const userId = await db.add(userData);
        res.status(201).json(userId);
      } catch (error) {
        res.status(500).json({ error: "Unable to add user to database" });
      }
    } else {
      res.status(200).json(checkEmail);
    }
  } catch (error) {
    let message = "error creating the user";
    res.status(500).json({ message, error });
  }
});

module.exports = router;
