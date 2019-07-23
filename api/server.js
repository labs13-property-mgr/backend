const express = require('express')
const configureMiddleware = require('./middleware/serversetup')

const client = require('twilio')(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
)

const server = express()
configureMiddleware(server)

//server.post('/', (req, res) => {
  //res.header('Content-Type', 'application/json');
  client.messages
      .create({
          from: '+17372154303',
          to: '+15129664123',
          body: 'This is a test message from RentMe App'
      })
      .then(message => console.log(message.sid))
//})

server.get('/', async (req, res) => {
  await res.status(200).json({ message: 'Server running....' })
})

module.exports = server
