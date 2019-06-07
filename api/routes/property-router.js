const router = require('express').Router()
const Db = require('../models/property-model')

router.get('/', async (req, res) => {
  try {
    const property = await Db.find()
    res.status(200).json(property)
  } catch (error) {
    console.log(error)
    res.status(500).json(error.message)
  }
})

router.post('/', async (req, res) => {
  try {
    const property = await Db.add(req.body)
    res.status(201).json(property)
  } catch (error) {
    console.log(error)
    res.status(500).json(error.message)
  }
})

module.exports = router
