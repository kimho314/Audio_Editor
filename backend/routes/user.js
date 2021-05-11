module.exports = app => {
    const user = require("../controllers/user");

    app.post("/api/login", user.createToken);
    app.post("/api/signup", user.create);
    app.put("/api/changePw", user.update);
};