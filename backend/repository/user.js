const sql = require("./db");

exports.create = async (user) => {
    let query = `INSERT INTO USER_INFO_TB (ID, USER_NAME, PASSWORD) 
                VALUES(?, ?, ?)`;
    let ret = await sql(query, user);
    console.log("user ret >>>>> ", ret);
    return ret;
};

exports.findById = async (id) => {
    let query = `SELECT ID, USER_NAME, PASSWORD, CREATE_DTM FROM USER_INFO_TB WHERE ID = ?`;
    let ret = await sql(query, { id: id });
    console.log("user findById >>>>> ", ret);
    if (ret.length > 0) {
        return ret;
    } else {
        return "not_found";
    }

};

exports.findByIdAndPw = async (id, password) => {
    let query = `SELECT ID, USER_NAME, PASSWORD, CREATE_DTM FROM USER_INFO_TB 
                    WHERE ID = ? AND PASSWORD = ?`;
    let ret = await sql(query, { id: id, password: password });
    console.log("user findByIdAndPw >>>>> ", ret);
    if (ret.length > 0) {
        return ret;
    } else {
        return "not_found";
    }
};

exports.update = async (id, password) => {
    let query = `UPDATE USER_INFO_TB SET PASSWORD = ? WHERE ID = ?`;
    let ret = await sql(query, { password: password, id: id });
    console.log("user update >>>>> ", ret);
    return ret;
}