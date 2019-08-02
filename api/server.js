const express = require('express')
const bodyParser = require('body-parser')
const configureMiddleware = require('./middleware/serversetup')

const client = require('twilio')(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
)

const server = express()
configureMiddleware(server)
server.use(bodyParser.urlencoded({ extended: false }))
server.use(bodyParser.json())

server.get('/', async (req, res) => {
  await res.status(200).json({ message: 'Server running....' })
})


server.post('/api/message', (req, res) => {
  res.header('Content-Type', 'application/json');
  client.messages
      .create({
          from: process.env.TWILIO_PHONE_NUMBER,
          to: req.body.to,
          body: "MESSAGE ALERT:" + " " + req.body.body + " " + "was reported through the RentMe-App" 
                  + " " + "http://www.rentme-app.com"
      })
      .then(() => {
          res.send(JSON.stringify({ success: true }));
      })
      .catch(err => {
          console.log(err);
          res.send(JSON.stringify({ success: false }));
      });
})

module.exports = server
