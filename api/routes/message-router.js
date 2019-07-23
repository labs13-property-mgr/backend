const express = require('express');
const router = express.Router();


router.post('/', (req, res) => {
    res.header('Content-Type', 'application/json');
    client.message
        .create({
            from: process.env.TWILIO_PHONE_NUMBER,
            to: req.body.to,
            body: req.body.body
        })
        .then(() => {
            res.send(JSON.stringify({ success: true }));
        })
        .catch(err => {
            console.log(err);
            res.send(JSON.stringify({ success: false }));
        });
})

module.exports = router;