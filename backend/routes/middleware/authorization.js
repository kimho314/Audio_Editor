const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();


const verifyToken = (req, res, next) => {
    try {
        const clientToken = req.cookies.user;
        const decoded = jwt.verify(clientToken, process.env.SECRET_KEY);

        if (decoded) {
            res.locals.userId = decoded.id;
            next();
        } else {
            res.status(401).json({ result: 'unauthorized' });
        }
    } catch (err) {
        res.status(401).json({ result: 'token expired' });
    }
};

exports.verifyToken = verifyToken;