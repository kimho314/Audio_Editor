module.exports = app => {
    const user = require("../controllers/user");

    app.post("/login", user.createToken);
    app.post("/signup", user.create);
    app.put("/changePw", user.update);
};