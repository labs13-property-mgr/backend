const express = require('express');
//const router = express.Router();


server.post('/', (req, res) => {
    res.header('Content-Type', 'application/json');
    client.message
        .create({
            from: process.env.TWILIO_PHONE_NUMBER,
            to: '+15129664123',
            body: 'This is a test message from RentMe App'
        })
        .then(message => console.log(message.sid))
})