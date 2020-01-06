const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
    if (req.signedCookies.access_token) {
        let token = req.signedCookies.access_token;
        jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
            console.log(decode);
            if (err) {
                res.redirect("/login");
            } else {
                res.locals.userInfo = decode;
                next();
            }
        });
    } else {
        res.redirect("/login");
    }
}

module.exports = authMiddleware;
