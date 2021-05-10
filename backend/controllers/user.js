const User = require("../models/User");
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

exports.createToken = async (req, res, next) => {
    try {
        // console.log(req.body);
        let user = await User.findByIdAndPw(req.body.id, req.body.password);
        console.log("createToken>>>>>>");
        console.log(user);

        if (user !== "not_found") {
            const token = jwt.sign({
                user_id: user[0].id
            }, process.env.SECRET_KEY, {
                expiresIn: '1h'
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

    const user = new User({
        id: req.body.id,
        userName: req.body.userName,
        password: req.body.password,
    });

    try {
        let userDup = await User.findById(user.id);
        console.log("userDup: ", userDup);
        if (userDup !== 'not_found') {
            res.status(400).send({ result: "user is already existed" });
            return;
        }
        let ret = await User.create(user);
        res.send({ result: "ok", data: ret });

    } catch (err) {
        console.error(err);
        next(err);
    }

};

exports.findById = async (req, res, next) => {
    try {
        let ret = await User.findById(req.params.userId);
        res.send({ result: "ok", data: ret });
    } catch (err) {
        console.error(err);
        res.status(400).json({
            result: "user is already existed"
        });
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