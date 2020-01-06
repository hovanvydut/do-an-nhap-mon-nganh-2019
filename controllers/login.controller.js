const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");

const static_path = process.env.STATIC_PATH;
const jwtSecret = process.env.JWT_SECRET;

module.exports = {
    getTemplate: function(req, res) {
        res.render("login.ejs", { static_path });
    },
    submitForm: async function(req, res) {
        let email = req.body.email;
        let password = req.body.password;

        let user = await userModel.findOne({ email, password });
        if (user !== null) {
            let payload = {
                userID: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            };

            let token = jwt.sign(payload, jwtSecret, {
                algorithm: "HS256",
                expiresIn: "4h"
            });

            res.cookie("access_token", token, { signed: true });
            if (user.role == "waiter") res.redirect("/waiter");
            if (user.role == "manager") res.redirect("/manager");
        } else {
            res.redirect("/login");
        }
    }
};
