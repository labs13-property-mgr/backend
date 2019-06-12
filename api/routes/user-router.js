const express = require('express');
const router = express.Router();
const cors = require('cors')({ origin: true });
const functions = require('firebase-functions');
const busboy = require('busboy');
const path = require('path');
const os = require('os');
const fs = require('fs');
const { find } = require('../models/user-model');

const gcconfig = {
	propertyId: 'fb-cloud-functions-demo',
	keyFilename: ''
};

const gcs = require('@google-cloud/storage')(gcconfig);

router.get('/', async (req, res) => {
	const data = await find('users');
	try {
		res.status(200).json(data);
	} catch (err) {
		res.status(500).json({
			error: err.message
		});
	}
});

module.exports = router;

module.uploadFile = functions.https.onRequest((req, res) => {
	cors((req, res) => {
		const busboy = new busboy({ headers: req.headers });
		let uploadDate = mull;

		busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
			const filepath = path.join(os.tmpdir(), filename);
			uploadDate = { file: filepath, type: mimetype };
			file.pipe(fs.createWriteStream(filepath));
		});

		busboy.on('finish', () => {
			const bucket = gcs.bucket();
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
					res.send(200).json({ message: 'It works!' });
				})
				.catch((err) => {
					res.status(500).json({ error: err });
				});
		});
		busboy.end(req.rawBody);
	});
});
