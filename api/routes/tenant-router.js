const express = require("express");
const router = express.Router();
const Db = require("../models/tenant-model");

router.get("/", async (req, res) => {
  try {
    const tenant = await Db.find();
    res.status(200).json(tenant);
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
});

// adds a tenant to a property ---
router.post("/", async (req, res) => {
  const { property_id, user_id } = req.body; // have these in the body

  if (!property_id || !user_id) {
    res.status(422).json({ message: "I need a property and user id" });
  }
  try {
    const tenant = await Db.add(req.body);
    res.status(201).json(tenant);
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
});

router.put("/:id", (req, res) => {
  Db("tenant")
    .where({ id: req.params.id })
    .update(req.body)
    .then(count => {
      if (count > 0) {
        res.status(200).json(count);
      } else {
        res.status(404).json({ message: "tenant not found" });
      }
    });
});

router.delete("/:id", (req, res) => {
  Db("tenant")
    .where({ id: req.params.id })
    .del()
    .then(count => {
      if (count > 0) {
        res.status(200).json(count);
      } else {
        res.status(404).json({ message: "action not found" });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

module.exports = router;
