const crypto = require('crypto');

module.exports = {
    // return salt and hasehd when signup
    encrypt: async (password) => {
        return new Promise(async (resolve, reject) => {
            try {
                const salt = (await crypto.randomBytes(32)).toString('hex');
                crypto.pbkdf2(password, salt.toString(), 1, 32, 'sha512', (err, derivedKey) => {
                    if (err)
                        throw err;
                    const hashed = derivedKey.toString('hex');
                    console.log({ salt, hashed });
                    resolve({ salt, hashed });
                });
            } catch (err) {
                console.error(err);
                reject(err);
            }
        })
    },
    // compare password entered by a user and the one stored in DB by using salt and password
    encryptWithSalt: async (password, salt) => {
        return new Promise(async (resolve, reject) => {
            try {
                crypto.pbkdf2(password, salt, 1, 32, 'sha512', (err, derivedKey) => {
                    if (err)
                        throw err;
                    const hashed = derivedKey.toString('hex');
                    resolve(hashed);
                });
            } catch (err) {
                console.error(err);
                reject(err);
            }
        })
    }
}