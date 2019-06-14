const express = require('express')
const router = express.Router()
// const cors = require('cors')({ origin: true })
// const functions = require('firebase-functions')
// const busboy = require('busboy')
// const path = require('path')
// const os = require('os')
// const fs = require('fs')
const { find } = require('../models/user-model')

// const gcconfig = {
//   propertyId: 'fb-cloud-functions-demo',
//   keyFilename: ''
// }

// const gcs = require('@google-cloud/storage')(gcconfig)
const db = require('../models/user-model')

//=====================================Generic Get all users
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

// module.exports = router

// module.uploadFile = functions.https.onRequest(async (req, res) => {
//   cors((req, res) => {
//     const busboy = new busboy({ headers: req.headers })
//     let uploadDate = mull

//     busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
//       const filepath = path.join(os.tmpdir(), filename)
//       uploadDate = { file: filepath, type: mimetype }
//       file.pipe(fs.createWriteStream(filepath))
//     })

//     busboy.on('finish', () => {
//       const bucket = gcs.bucket()
//       bucket
//         .upload(uploadData.file, {
//           uploadType: 'media',
//           metadata: {
//             metadata: {
//               contentType: uploadData.type
//             }
//           }
//         })
//         .then(() => {
//           res.send(200).json({ message: 'It works!' })
//         })
//         .catch(err => {
//           res.status(500).json({ error: err })
//         })
//     })
//     busboy.end(req.rawBody)
//   })
// })
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
