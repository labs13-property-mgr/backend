const express = require('express')
const configureMiddleware = require('./middleware/serversetup')

const client = require('twilio')(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
)

const server = express()
configureMiddleware(server)

server.get('/', async (req, res) => {
  await res.status(200).json({ message: 'Server running....' })
})

module.exports = server
