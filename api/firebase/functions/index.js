const functions = require('firebase-functions');
const os = require('os');
const path = require('path');
const spawn = require('child-process-promise').spawn;
const cors = require('cors')({ origin: true });
const Busboy = require('busboy');
const fs = require('fs');
const express = require('express');

const app = express();

var admin = require("firebase-admin");

var serviceAccount = require("./config");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://rentme-52af4.firebaseio.com"
});

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

const { Storage } = require('@google-cloud/storage');

const storage = new Storage({
    projectId: 'rentme-52af4',
    keyFilename: 'config.json'
});




exports.onFileChange = functions.storage.object().onFinalize(event => {
    const bucket = event.bucket;
    const contentType = event.contentType;
    const filePath = event.name;
    console.log('File change detected, function execution started');


    let property_image_url = event.name;
    let split_property_image_and_id = property_image_url.split(" ")[0];
    let property_id = parseInt(split_property_image_and_id.split("-")[1]);

    let property_table = property_image_url.split(" ")[1];
    console.log(property_table);

        console.log(property_id);
        console.log(typeof(property_id));

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




    return destBucket.file(filePath).download({
        destination: tmpFilePath
    }).then(() => {
        
        return spawn('convert', [tmpFilePath, '-resize', '300x180', tmpFilePath]);

    }).then(() => {
        destBucket.upload(tmpFilePath, {

            destination: 'resized-' + path.basename(filePath),
            metadata: metadata

        });

        if (path.basename(filePath).startsWith('resized-') === false) {
        // console.log('need to delete' + path.basename(filePath));
            storage
                .bucket('rentme-52af4.appspot.com')
                .file(path.basename(filePath))
                .delete();
            return;
        }
        
        // storage
        //     .bucket('rentme-52af4.appspot.com')
        //     .getFiles()
        //     .then(results => {

        //         const files = results[0];
                
        //         let oldFileDeleter = [];
                
        //         return files.forEach(file => {
        //             if (file.name.startsWith("resized-" + property_id)) {
        //                 oldFileDeleter.push(file);
        //                 if (oldFileDeleter.length === 2){
        //                     let file1 = oldFileDeleter[0];
        //                     let file2 = oldFileDeleter[1];

        //                     console.log('file1' + file1);
        //                     console.log('file2' + file2);
        //                 }
        //             }
        //         })
        //     }).catch(err => {
        //         return err;
        //     })

        return fs.unlinkSync(tempFilePath);

    })
    
});


app.get('/file/:name', (req, res) => {

    let fileName = "resized-" + req.params.name;
    // res.send('yo')
    cors(req, res, () => {
        if (req.method !== 'GET') {
            return res.status(500).json({
                message: 'Not Allowed'
            });
        }

        
        console.log(fileName)

        storage
            .bucket('rentme-52af4.appspot.com')
            .getFiles()
            .then(results => {
                const files = results[0];
                console.log('Files:');
                return files.forEach(file => {
                    if (file === fileName)
                    console.log(file.name)

                    return file.getSignedUrl({
                        action: 'read',
                        expires: '03-09-2491'
                    }).then(signedUrl => {

                        console.log(signedUrl);

                        let url = signedUrl[0];

                        console.log('url ' + url);
                        console.log(typeof(url))
                        
                        
                        return res.status(200).json(
                            url
                        );
                        

                    })
                })
            
            }).catch(err => {
                res.status(500).json({
                    error: err
                })
            })
    })
})



exports.getfile = functions.https.onRequest(app);
    



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

        busboy.on('finish', () => {
            const bucket = storage.bucket('rentme-52af4.appspot.com');
            bucket.upload(uploadData.file, {
                uploadType: 'media',
                metadata: {
                    metadata: {
                        contentType: uploadData.type
                    }
                }


            }).then(() => {

                return res.status(200).json({
                    message: 'it worked'
                });
            })
            .catch(err => {
                return res.status(500).json({
                    error: err
                })
            })
        });
        busboy.end(req.rawBody);
    });

});



