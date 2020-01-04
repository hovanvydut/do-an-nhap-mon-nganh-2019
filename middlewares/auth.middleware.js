const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
    if (req.signedCookies.access_token) {
        let token = req.signedCookies.access_token;
        jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
            if (err) {
                // next("Token invalid");
                res.redirect("/login");
                return;
            } else {
                next();
                return;
            }
        });
    } else {
        // next("Unauthorizated");
        res.redirect("/login");
        return;
    }
}

module.exports = authMiddleware;
