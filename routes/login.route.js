const express = require("express");
const router = express.Router();
const controller = require("../controllers/login.controller");

router.get("/", controller.getTemplate);
router.post("/", controller.submitForm);

module.exports = router;
