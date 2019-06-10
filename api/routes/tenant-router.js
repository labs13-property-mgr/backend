const router = require("express").Router();
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

router.post("/", async (req, res) => {
  try {
    const tenant = await Db.add(req.body);
    res.status(201).json(tenant);
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
});

// post

// put - edit

// delete

module.exports = router;
