const Audio = require('../models/Audio');
const path = require('path');
const fs = require('fs');


exports.getAll = async (req, res, next) => {
    try {
        let ret = await Audio.findAll(req.params.userId);
        res.send({ result: "ok", data: ret });
    } catch (err) {
        console.error(err);
        next(err);
    }
};

exports.playUploadAudio = async (req, res, next) => {
    try {
        let userId = req.query.userId;
        let trackName = req.query.trackName;
        let ret = await Audio.findOne(trackName, userId);
        if (ret !== 'not_found') {
            let file = path.resolve(ret[0].FILE_PATH, ret[0].TRACK_NAME);
            console.log(file);

            if (fs.existsSync(file)) {
                console.log('file exists');
                let rstream = fs.createReadStream(file);
                rstream.pipe(res);
            } else {
                console.log('file no exists');
                res.status(404).send({ result: "audio no exist in server" });
                res.end();
            }
        } else {
            res.status(404).send({ result: "audio no exist in DB" });
        }
    } catch (err) {
        console.error(err);
        next(err);
    }
};

exports.upload = async (req, res, next) => {
    if (!req.body) {
        res.status(400).send({
            result: "content can not be empty!"
        });
    }

    try {
        console.log("audio upload >>>>>>>>>>");
        console.log(req.body);
        console.log(req.file);

        const audio = new Audio({
            title: req.body.title,
            album: req.body.album,
            artist: req.body.artist,
            filePath: path.resolve("uploads", req.body.userId),
            userId: req.body.userId,
            trackName: req.file.originalname,
        });
        let ret = await Audio.create(audio);
        res.send({ result: "ok", data: ret });
    } catch (err) {
        console.error(err);
        next(err);
    }
};

exports.update = async (req, res, next) => {
    if (!req.body) {
        res.status(400).send({
            result: "content can not be empty!"
        });
    }

    try {
        let audioDup = await Audio.findOne(req.body.trackName, req.body.userId);
        if (audioDup === 'not_found') {
            res.status(404).send({ result: "audio is not found" });
            return;
        }

        const audio = new Audio({
            trackName: req.body.trackName,
            title: req.body.title,
            album: req.body.album,
            artist: req.body.artist,
            userId: req.body.userId,
        });
        let ret = await Audio.update(audio);
        res.send({ result: "ok", data: ret });
    } catch (err) {
        console.error(err);
        next(err);
    }
};