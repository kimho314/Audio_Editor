const sql = require("./db");

exports.create = async (audio) => {
    let query = `INSERT INTO AUDIO_LIST_TB (USER_ID, TRACK_NAME, TITLE, ALBUM, FILE_PATH, ARTIST) 
                VALUES(?, ?, ?, ?, ?, ?)`;
    let ret = await sql(query, audio);
    console.log("audio create >>>>> ", ret);
    return ret;
};

exports.update = async (audio) => {
    let query = `UPDATE AUDIO_LIST_TB SET TITLE = ?, ALBUM = ?, ARTIST = ? 
                    WHERE TRACK_NAME = ? AND USER_ID = ?`;
    let ret = await sql(query, audio);
    console.log("audio update >>>>> ", ret);
    return ret;
};

exports.findAll = async (userId) => {
    let query = `SELECT SEQ, USER_ID, TRACK_NAME, TITLE, ALBUM, FILE_PATH, ARTIST
                 FROM AUDIO_LIST_TB
                 WHERE USER_ID = ?`;
    let ret = await sql(query, { userId: userId });
    console.log("audio findAll >>>>> ", ret);
    return ret;
};

exports.findOne = async (trackName, userId) => {
    let query = `SELECT SEQ, USER_ID, TRACK_NAME, TITLE, ALBUM, FILE_PATH, ARTIST
                 FROM AUDIO_LIST_TB
                 WHERE TRACK_NAME = ? AND USER_ID = ?`;
    let ret = await sql(query, { trackName: trackName, userId: userId });
    console.log("audio findOne >>>>> ", ret);
    if (ret.length > 0) {
        return ret;
    } else {
        return "not_found";
    }
};