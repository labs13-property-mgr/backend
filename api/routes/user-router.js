const express = require('express')
const router = express.Router()

const { find } = require('../models/user-model')

router.get('/', async (req, res) => {
  const data = await find('users')
  try {
    res.status(200).json(data)
  } catch (err) {
    res.status(500).json({
      error: err.message
    })
  }
})

module.exports = router
