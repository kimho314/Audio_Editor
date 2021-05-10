const sql = require("./db");

// constructor
const User = function (user) {
    this.id = user.id;
    this.userName = user.userName;
    this.password = user.password;
};


User.create = (newUser) => {
    return new Promise((resolve, reject) => {
        console.log(newUser);
        let query = `INSERT INTO USER_INFO_TB (ID, USER_NAME, PASSWORD) 
                VALUES(?, ?, ?)`;
        sql.query(query, Object.values(newUser), (err, res) => {
            if (err) {
                console.error(err);
                reject(err);
                return;
            }
            // console.log(res);
            console.log("created user: ", { id: res.insertId, ...newUser });
            resolve({ id: res.insertId, ...newUser });
        });
    });
};


User.findById = (id) => {
    return new Promise((resolve, reject) => {
        let query = `SELECT ID, USER_NAME, PASSWORD, CREATE_DTM FROM USER_INFO_TB WHERE ID = '${id}'`;
        sql.query(query, (err, res) => {
            if (err) {
                console.error(err);
                reject(err);
                return;
            }

            if (res.length > 0) {
                console.log("found customer: ", res);
                resolve(res);
                return;
            }

            resolve("not_found");
        });
    })

};

User.findByIdAndPw = (id, password) => {
    return new Promise((resolve, reject) => {
        let query = `SELECT ID, USER_NAME, PASSWORD, CREATE_DTM FROM USER_INFO_TB 
                    WHERE ID = '${id}' AND PASSWORD = '${password}'`;
        sql.query(query, (err, res) => {
            if (err) {
                console.error(err);
                reject(err);
                return;
            }

            if (res.length > 0) {
                console.log("found customer: ", res);
                resolve(res);
                return;
            }

            resolve("not_found");
        });
    })
};

User.update = (id, password) => {
    return new Promise((resolve, reject) => {
        let query = `UPDATE USER_INFO_TB SET PASSWORD = '${password}' WHERE ID = '${id}'`;
        sql.query(query, (err, res) => {
            if (err) {
                console.error(err);
                reject(err);
                return;
            }

            console.log("update password >>>>>>>>>>>>");
            console.log(res);
            resolve(res);
        });
    })
};


module.exports = User;