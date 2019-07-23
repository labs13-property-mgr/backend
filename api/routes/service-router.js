const express = require("express");
const router = express.Router();
const db = require("../models/service-model");

//============================Read Router
router.get("/", async (req, res) => {
  const data = await db.find("service");
  try {
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
});
//============================Create Router
router.post("/", async (req, res) => {
  const body = req.body;
  try {
    const inserted = await db.add(body);
    const history = await db.addHistory(body);
    res.status(201).json(inserted);
  } catch (err) {
    console.error({ code: err.code, message: err.message });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const service = await db.findById(id);
    return res.status(200).json(service);
  } catch (err) {
    console.error({ code: err.code, message: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await db.deleteService(id);
    return res.status(200).json(deleted);
  } catch (err) {
    console.error({ code: err.code, message: err.message });
  }
});

//========================================================now works in postman
router.put("/:id", async (req, res) => {
  try {
    const updated = await db.update(req.params.id, req.body);
    if (updated) {
      res.status(200).json(updated);
    } else {
      res.status(404).json({ message: "service request not found" });
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
});

//=============

//instructions(ideas) for retrieving service order history for specific property

// when posting service request - also add it to your history table [xxx]
// get request to retrieve service history of specific property id []

module.exports = router;
