const express = require('express')
const router = express.Router();
const mongoose = require('mongoose')

const file = require('../models/files.models')

const authMiddleware = require('../middlewares/authe');


//this is for firebase
// const upload = require('../config/multer.config')
//here upload is using all multer settings

// localStorage
const upload = require('../config/localUpload.config'); // Use local config
const path = require('path');
const fs = require('fs');


router.get('/', authMiddleware, async (req, res) => {



    //find userfiles

    // req user is this

    //      {
    //   userId: '6989e2b08366f865d2cdee6b',
    //   email: 'sudhakumarichauhan24@gmail.com',
    //   username: 'Sudha',
    //   iat: 1770818798
    // }

    console.log("req.user.userId: ", req.user.userId);

    console.log('Type:', typeof req.user.userId);//String
    const userIdObj = new mongoose.Types.ObjectId(req.user.userId);//Object
    console.log('Type userId:', typeof userIdObj);

    file.find({
        user: userIdObj  // Now both are ObjectId type
    }).then((userfiles) => {

        // res.send(userfiles);
        console.log(userfiles);
        // console.log('Type:', typeof userfiles.user);

        res.render('home',{files:userfiles})
    }).catch(err => {
        console.error(err);
        res.status(500).send('Error fetching files');
    });




})


router.get('/upload', authMiddleware, (req, res) => {
    res.render('upload');

})

router.post('/upload', authMiddleware, upload.single('fileInput'), async (req, res) => {

    // upload.single('fileInput') here this uploaded will send in the bucket. or localStorage

    try {
        // Debug what you're receiving
        // console.log('req.user:', req.user);
        // console.log('req.user.userId:', req.user.userId);
        // console.log('req.user file posted:', req.user);


        const dbPath = `firebasefiles/${path.basename(req.file.path)}`; // / slash matters


        const newFile = await file.create({
            // path: req.file.path,
            path: dbPath,
            originalName: req.file.originalname,
            user: req.user.userId  // Make sure this is being set
        });

        res.send("file created")

        console.log('File created with user:', newFile.user);
        res.status(201).json(newFile);

    } catch (error) {
        console.error('Error creating file:', error);
        res.status(500).json({ error: error.message });

    }


    res.send(req.fileInput); //input name value
});






// Route to VIEW/OPEN the file in browser
router.get('/open/:fileId', authMiddleware, async (req, res) => {
    try {
        const fileRecord = await file.findById(req.params.fileId);
        
        if (!fileRecord) {
            return res.status(404).send('File not found');
        }

        // Construct full path
        const fullPath = path.join(path.resolve(__dirname, '../'), fileRecord.path); //path.resolve(__dirname, '../'): The path.resolve() method processes path segments to produce a single absolute path. It takes __dirname (an absolute path, e.g., /users/project/src) and the relative segment '../'.
        
        // Check if file exists
        if (!fs.existsSync(fullPath)) {
            return res.status(404).send('File not found');
        }

        // Set content type based on file extension
        const ext = path.extname(fileRecord.originalName).toLowerCase();
        let contentType = 'application/octet-stream';
        
        if (ext === '.pdf') {
            contentType = 'application/pdf';
        } else if (ext === '.jpg' || ext === '.jpeg') {
            contentType = 'image/jpeg';
        } else if (ext === '.png') {
            contentType = 'image/png';
        } else if (ext === '.txt') {
            contentType = 'text/plain';
        }
        
        res.setHeader('Content-Type', contentType);//Content-Type: res.setHeader('Content-Type', contentType) tells the browser how to interpret the file (e.g., image/png, application/pdf).
        res.setHeader('Content-Disposition', `inline; filename="${fileRecord.originalName}"`);//res.setHeader('Content-Disposition', 'inline; ...') instructs the browser to attempt to display the file directly (inline) rather than downloading it, while filename provides the default name.
        
        res.sendFile(fullPath);

    } catch (error) {
        console.error('Open file error:', error);
        res.status(500).send('Error opening file');
    }
});

// Route to DOWNLOAD file
router.get('/download/:fileId', authMiddleware, async (req, res) => {
    try {
        const fileRecord = await file.findById(req.params.fileId);
        
        if (!fileRecord) {
            return res.status(404).send('File not found');
        }

        // Construct full path
        const fullPath = path.join(path.resolve(__dirname, '../'), fileRecord.path);
        
        if (!fs.existsSync(fullPath)) {
            return res.status(404).send('File not found');
        }

        // Force download with attachment disposition
        res.download(fullPath, fileRecord.originalName);

    } catch (error) {
        console.error('Download error:', error);
        res.status(500).send('Error downloading file');
    }
});



// Add this temporary route to debug
router.get('/test-open/:filename', async (req, res) => {
    const filename = req.params.filename;
    const fullPath = path.join('C:\\Sudhadocuments\\MERN\\Backend Complete\\drive\\firebasefiles', filename);
    
    console.log('Test open path:', fullPath);
    
    if (fs.existsSync(fullPath)) {
        res.sendFile(fullPath);
    } else {
        res.send('File not found at: ' + fullPath);
    }
});


module.exports = router