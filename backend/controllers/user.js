// const User = require("../models/User");
const User = require("../repository/user");
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const Crypto = require("../utils/crypto");
dotenv.config();

exports.createToken = async (req, res, next) => {
    try {
        let salt = await User.findSaltById(req.body.id);
        // console.log("salt: ", salt[0].SALT);
        let hashed = await Crypto.encryptWithSalt(req.body.password, salt[0].SALT);
        // console.log("hashed: ", hashed);
        let user = await User.findByIdAndPw(req.body.id, hashed);
        console.log("createToken>>>>>>");
        console.log(user);

        if (user !== "not_found") {
            const token = jwt.sign({
                user_id: user[0].id
            }, process.env.SECRET_KEY, {
                expiresIn: '10m'
            });
            res.cookie('user', token);
            res.status(201).json({
                result: 'ok',
                token
            });
        } else {
            res.status(400).json({ result: 'invalid user' });
        }
    } catch (err) {
        console.error(err);
        next(err);
    }
};


exports.create = async (req, res, next) => {
    // validate request
    if (!req.body) {
        res.status(400).send({
            result: "content can not be empty!"
        });
    }

    try {
        let { salt, hashed } = await Crypto.encrypt(req.body.password);
        // console.log(hashed);
        // let userDup = await User.findByIdAndPw(user.id, user.password);
        let userDup = await User.findByIdAndPw(req.body.id, hashed);
        console.log("userDup: ", userDup);
        if (userDup !== 'not_found') {
            res.status(400).send({ result: "user is already existed" });
            return;
        }

        const user = {
            id: req.body.id,
            userName: req.body.userName,
            password: hashed,
            salt: salt
        };
        let ret = await User.create(user);
        res.send({ result: "ok", data: ret });

    } catch (err) {
        console.error(err);
        next(err);
    }

};


exports.update = async (req, res, next) => {
    try {
        let userDup = await User.findByIdAndPw(req.body.id, req.body.password);
        if (userDup === 'not_found') {
            res.status(400).send({ result: "user is not found" });
            return;
        }

        let ret = await User.update(req.body.id, req.body.password);
        res.send({ result: "ok", data: ret });
    } catch (err) {
        console.error(err);
        next(err);
    }
}