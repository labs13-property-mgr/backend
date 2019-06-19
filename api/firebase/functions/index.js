var admin = require('firebase-admin');

var serviceAccount = require('./config');

module.exports = {
  admin: admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://rentme-52af4.firebaseio.com'
  })
};

const functions = require('firebase-functions');

const os = require('os');
const path = require('path');
const spawn = require('child-process-promise').spawn;
// const express = require('express');
// const router = express.Router();
const cors = require('cors')({ origin: true });
// const functions = require('firebase-functions');
const Busboy = require('busboy');
const fs = require('fs');
// const { find } = require('../models/user-model');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

const { Storage } = require('@google-cloud/storage');

const storage = new Storage({
  projectId: 'rentme-52af4',
  keyFilename: 'config.json'
});

exports.onFileChange = functions.storage.object().onFinalize(event => {
  const bucket = event.bucket;
  console.log(event);
  const contentType = event.contentType;
  const filePath = event.name;
  console.log('File change detected, function execution started');

  if (event.id === null) {
    console.log('We deleted a file, exit...');
    return;
  }

  if (path.basename(filePath).startsWith('resized-')) {
    console.log('We already resized that file!');
    return;
  }

  const destBucket = storage.bucket(bucket);
  const tmpFilePath = path.join(os.tmpdir(), path.basename(filePath));
  const metadata = { contentType: contentType };

  return destBucket
    .file(filePath)
    .download({
      destination: tmpFilePath
    })
    .then(() => {
      return spawn('convert', [tmpFilePath, '-resize', '100x100', tmpFilePath]);
    })
    .then(() => {
      return destBucket.upload(tmpFilePath, {
        destination: 'resized-' + path.basename(filePath),
        metadata: metadata
      });
    });
});

exports.uploadFile = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    if (req.method !== 'POST') {
      return res.status(500).json({
        message: 'Not Allowed'
      });
    }
    const busboy = new Busboy({ headers: req.headers });

    let uploadData = null;

    busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
      const filePath = path.join(os.tmpdir(), filename);
      uploadData = { file: filePath, type: mimetype };
      file.pipe(fs.createWriteStream(filePath));
    });
    // busboy.on('field');
    busboy.on('finish', () => {
      const bucket = storage.bucket('rentme-52af4.appspot.com');
      bucket
        .upload(uploadData.file, {
          uploadType: 'media',
          metadata: {
            metadata: {
              contentType: uploadData.type
            }
          }
        })
        .then(() => {
          return res.status(200).json({
            message: 'It worked!'
          });
        })
        .catch(err => {
          return res.status(500).json({
            error: err
          });
        });
    });
    busboy.end(req.rawBody);
  });
});

// module.uploadFile = functions.https.onRequest((req, res) => {
//     cors((req, res) => {
//         const busboy = new busboy({ headers: req.headers });
//         let uploadDate = mull;

//         busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
//             const filepath = path.join(os.tmpdir(), filename);
//             uploadDate = { file: filepath, type: mimetype };
//             file.pipe(fs.createWriteStream(filepath));
//         });

//         busboy.on('finish', () => {
//             const bucket = gcs.bucket();
//             bucket
//                 .upload(uploadData.file, {
//                     uploadType: 'media',
//                     metadata: {
//                         metadata: {
//                             contentType: uploadData.type
//                         }
//                     }
//                 })
//                 .then(() => {
//                     res.send(200).json({ message: 'It works!' });
//                 })
//                 .catch((err) => {
//                     res.status(500).json({ error: err });
//                 });
//         });
//         busboy.end(req.rawBody);
//     });
// });
