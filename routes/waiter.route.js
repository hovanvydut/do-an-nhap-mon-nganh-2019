const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const authMiddleware = require("../middlewares/auth.middleware");

router.get("/", function(req, res, next) {
    res.render("waiter");
    /* if (err == "") {
        res.send("Waiter page");
    } else {
        res.redirect("/login");
    } */
});

module.exports = router;

/* 
const express = require("express");
const router = express.Router();
const controller = require("../controllers/login.controller");

router.get("/", controller.getTemplate);
router.post("/", controller.submitForm);

module.exports = router;
*/
