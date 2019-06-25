const express = require("express");
const router = express.Router();
const {
  add,
  find,
  findByEmail,
  remove,
  update,
  findPropByUser,
  insert
} = require("../models/user-model");

const db = require("../models/user-model"); // larrysimiyu test

router.get("/", async (req, res) => {
  try {
    const data = await find("users");
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
});

router.get("/email", (req, res) => {
  const { email } = req.body;

  findByEmail(email)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      console.log(err);
    });
});

router.get("/:id", (req, res) => {
  const user_id = req.params.id;
  findById(user_id)
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

router.get("/:id/properties", async (req, res) => {
  const user_id = req.params.id;
  findPropByUser(user_id)
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

router.put("/:id", async (req, res) => {
  try {
    const updated = await update(req.params.id, req.body);
    if (updated) {
      res.status(200).json(updated);
    } else {
      res.status(404).json({ message: "User ID not found" });
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const count = await remove(req.params.id);
    if (count > 0) {
      res.status(200).json({ message: "User Deleted" });
    } else {
      res.status(404).json({ message: "User ID not found" });
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
});

// uncomment when not using Larry Simiyu code
// router.post('/', async (req, res) => {
//   try {
//     const userData = req.body;
//     const checkEmail = await findByEmail(userData.email);
//     if (!checkEmail) {
//       try {
//         const userId = await add(userData);
//         res.status(201).json(userId);
//       } catch (error) {
//         res.status(500).json({ error: 'Unable to add user to database' });
//       }
//     } else {
//       res.status(200).json(checkEmail);
//     }
//   } catch (error) {
//     let message = 'error creating the user';
//     res.status(500).json({ message, error });
//   }
// });

//test post -------Larry Simiyu
router.post("/", async (req, res) => {
  if (!req.body.First_name) {
    return res.status(400).json({
      message: "Please provide a name for the user"
    });
  }

  try {
    let newUser = await db.insert(req.body);
    let updatedArray = await db.find();
    return res.status(201).json({
      id: newUser.id,
      name: req.body.First_name,
      users: updatedArray //lazy loading, return an updated array of users
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
});

module.exports = router;
