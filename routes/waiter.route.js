const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const authMiddleware = require("../middlewares/auth.middleware");

router.get("/", function(req, res, next) {
    const userInfo = res.locals.userInfo;
    res.render("waiter", userInfo);
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
