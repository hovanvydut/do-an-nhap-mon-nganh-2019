const express = require("express");
const router = express.Router();

const static_path = process.env.STATIC_PATH;

router.get("/", function(req, res, next) {
    res.render("index", { static_path });
});

module.exports = router;
