module.exports = app => {
    const audioEditorController = require('../controllers/audioEditor');
    const { verifyToken } = require('./middleware/authorization');
    const multer = require('multer');
    const path = require('path');
    const fs = require('fs');

    fs.readdir('uploads', (err) => {
        // create upload directori if it doesn't exist
        if (err) {
            fs.mkdirSync('uploads');
        }
    })

    // upload audio files
    // this method is called before audioEditorController
    const upload = multer({
        storage: multer.diskStorage({
            destination(req, file, cb) {
                console.log('req: ', req.body.userId);
                let destDir = 'uploads' + path.sep + req.body.userId;
                fs.readdir(destDir, (err) => {
                    if (err) {
                        fs.mkdirSync(destDir);
                    }
                    cb(null, destDir);
                })
                // cb(null, 'uploads/');
                // cb(null, destDir);
            },
            filename(req, file, cb) {
                const ext = path.extname(file.originalname);
                cb(null, path.basename(file.originalname, ext) + ext);
            },
        }),
    });

    app.get('/audioList/:userId', verifyToken, audioEditorController.getAll);
    app.post('/uploadAudio', verifyToken, upload.single('audioFile'), audioEditorController.upload);
    app.get('/playUploadAudio', verifyToken, audioEditorController.playUploadAudio);
    app.put('/updateAudio', verifyToken, audioEditorController.update);
};