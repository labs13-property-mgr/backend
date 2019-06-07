const express = require('express')
const configureMiddleware = require('./middleware/serversetup')

const server = express()
configureMiddleware(server)

const db = require('../data/dbConfig')

server.get('/', async (req, res) => {
  await res.status(200).json({ message: 'Server running....' })
})

server.get('/api/users', async (req, res) => {
  const data = await db('users')
  try {
    res.status(200).json(data)
  } catch (err) {
    res.status(500).json({
      errorMesssage:
        'An error has occured with the server. Please retry the request in a few seconds.'
    })
  }
})

server.get('/api/properties', async (req, res) => {
  const data = await db('property')
  try {
    res.status(200).json(data)
  } catch (err) {
    res.status(500).json({
      errorMesssage:
        'An error has occured with the server. Please retry the request in a few seconds.'
    })
  }
})
module.exports = server
