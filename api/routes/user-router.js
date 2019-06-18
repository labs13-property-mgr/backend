const express = require('express')
const router = express.Router()
const db = require('../models/user-model')

//=====================================Generic Get all users
router.get('/', async (req, res) => {
  const data = await db.find('users')
  try {
    res.status(200).json(data)
  } catch (err) {
    res.status(500).json({
      error: err.message
    })
  }
})

//--------------------get user by id
router.get('/:id', (req, res) => {
  const user_id = req.params.id
  db.findById(user_id)
    .then(user => {
      if (user) {
        res.status(200).json(user)
      } else {
        res.status(404).json({ message: 'user not found' })
      }
    })
    .catch(error => {
      if (error) {
        res.status(500).json({ message: `Error : ${error}` })
      }
    })
})

//=====================================User Property routes
//--------------------get properties by user id
router.get('/:id/properties', async (req, res) => {
  const user_id = req.params.id
  db.findPropByUser(user_id)
    .then(properties => {
      if (properties) {
        res.status(200).json(properties)
      } else {
        res.status(404).json({
          Message:
            'These properties are lost like the Donner party...sad indeed'
        })
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: `The properties seems to be lost try again` })
    })
})
//--------------------get single property by user id

module.exports = router
