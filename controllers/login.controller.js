const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");

const static_path = process.env.STATIC_PATH;
const secretKey = process.env.SECRET_KEY;

module.exports = {
    getTemplate: function(req, res) {
        res.render("login.ejs", { static_path });
    },
    submitForm: async function(req, res) {
        let email = req.body.email;
        let password = req.body.password;

        let user = await userModel.findOne({ email, password });

        if (user !== null) {
            if (user.role == "waiter") {
                let token = jwt.sign(
                    {
                        _id: user.id,
                        name: user.name,
                        email: user.email,
                        password: user.password,
                        role: user.role
                    },
                    secretKey,
                    {
                        algorithm: "HS256",
                        expiresIn: "4h"
                    }
                );
                res.cookie("access_token", token, { signed: true });
                res.set("Authorization", "bearer " + token);
                res.redirect("/waiter");
            }
        } else {
            res.redirect("/login");
        }
    }
};
