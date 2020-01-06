const mongoose = require("mongoose");

let schema = new mongoose.Schema({
    employeeID: String,
    numTable: Number,
    list: [{ name: String, num: Number }]
});

let histories = mongoose.model("histories", schema);

module.exports = histories;
