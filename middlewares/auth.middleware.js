const jwt = require("jsonwebtoken");

module.exports = function(req, res, next) {
    if (req.signedCookies.access_token) {
        let token = req.signedCookies.access_token;
        jwt.verify(token, process.env.SECRET_KEY, (err, decode) => {
            if (err) {
                next("Token invalid");
            } else {
                next();
            }
        });
    } else {
        next("Unauthorizated");
    }
};
