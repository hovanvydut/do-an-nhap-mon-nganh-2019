module.exports = function(req, res, next) {
    res.clearCookie("access_token");
    res.redirect("/");
};
