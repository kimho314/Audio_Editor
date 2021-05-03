const sql = require("./db");

// constructor
const Audio = function (audio) {
    this.title = audio.title;
    this.album = audio.album;
    this.artist = audio.artist;
    this.filePath = audio.filePath;
    this.userId = audio.userId;
    this.trackName = audio.trackName;
};

/*
 * title: req.body.title,
 * album: req.body.album,
 * artist: req.body.artist,
 * filePath: path.resolve("uploads", req.body.userId),
 * userId: req.body.userId,
 * trackName: req.file.originalname,
*/
Audio.create = (newAudio) => {
    return new Promise((resolve, reject) => {
        console.log(newAudio);
        let query = `INSERT INTO AUDIO_LIST_TB (TITLE, ALBUM, ARTIST, FILE_PATH, USER_ID, TRACK_NAME) 
                VALUES(?, ?, ?, ?, ?, ?)`;
        sql.query(query, Object.values(newAudio), (err, res) => {
            if (err) {
                console.error(err);
                reject(err);
                return;
            }
            // console.log(res);
            console.log("created audio: ", { seq: res.insertId, ...newAudio });
            resolve({ seq: res.insertId, ...newAudio });
        });
    });
};


Audio.update = (newAudio) => {
    const audio = {
        title: newAudio.title,
        album: newAudio.album,
        artist: newAudio.artist,
    };
    console.log('aduio: ', audio);
    return new Promise((resolve, reject) => {
        let query = `UPDATE AUDIO_LIST_TB SET TITLE = ?, ALBUM = ?, ARTIST = ? 
                    WHERE TRACK_NAME = '${newAudio.trackName}' AND USER_ID = '${newAudio.userId}'`;
        sql.query(query, Object.values(audio), (err, res) => {
            if (err) {
                console.error(err);
                reject(err);
                return;
            }

            console.log("update audio: ", res);
            resolve(res);
        })
    });
};

Audio.findAll = (userId) => {
    return new Promise((resolve, reject) => {
        let query = `SELECT SEQ, USER_ID, TRACK_NAME, TITLE, ALBUM, FILE_PATH, ARTIST
                        FROM AUDIO_LIST_TB
                        WHERE USER_ID = '${userId}'`;
        sql.query(query, (err, res) => {
            if (err) {
                console.error(err);
                reject(err);
                return;
            }

            console.log("find all audios: ", res);
            resolve(res);
        });
    });
};

Audio.findOne = (trackName, userId) => {
    return new Promise((resolve, reject) => {
        let query = `SELECT SEQ, USER_ID, TRACK_NAME, TITLE, ALBUM, FILE_PATH, ARTIST
                    FROM AUDIO_LIST_TB
                    WHERE TRACK_NAME = '${trackName}' AND USER_ID = '${userId}'`;
        sql.query(query, (err, res) => {
            if (err) {
                console.error(err);
                reject(err);
                return;
            }

            if (res.length > 0) {
                console.log("found an audio: ", res);
                resolve(res);
                return;
            }

            resolve("not_found");
        });
    });
};

module.exports = Audio;