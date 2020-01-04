const express = require("express");
const router = express.Router();
const controller = require("../controllers/logout.controller");

router.get("/", controller);

module.exports = router;
