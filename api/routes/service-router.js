const express = require('express');
const router = express.Router();
router.use(express.json());
const db = require('../models/service-model');

//============================Read Router
router.get('/', async (req, res) => {
  const data = await db.find('service');
  try {
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
});
//============================Create Router
router.post('/', async (req, res) => {
  const body = req.body;

  try {
    const inserted = await db.add(body);
    return res.status(201).json(inserted);
  } catch (err) {
    console.error({ code: err.code, message: err.message });
  }
});
//============================Update Router
//============================Delete Router
module.exports = router;
