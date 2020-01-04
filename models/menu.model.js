const mongoose = require("mongoose");

let schema = new mongoose.Schema({
    name: String,
    price: String,
    type: String
});

let menus = mongoose.model("menus", schema);

module.exports = menus;
