const express = require('express')
const router = express.Router()

const { find } = require('../models/service-model')

//============================Read Router
router.get('/', async (req, res) => {
  const data = await find('service')
  try {
    res.status(200).json(data)
  } catch (err) {
    res.status(500).json({
      error: err.message
    })
  }
})
//============================Create Router
router.post("/", async (req, res) => {
  
    try {
      const service = req.body;
      const inserted = await db.add(service);
      res.status(201).json({ message: "Service Requested" })
    } catch (error) {
      res.status(500).json({ error: "A problem occured"})
    }
});
//============================Update Router
//============================Delete Router
module.exports = router