const mongoose = require("mongoose");

let Schema = new mongoose.Schema({
    number_table: String,
    isEmpty: String,
    bevarage_list: Array,
    isOrder: String,
    who: String
});

let tables = mongoose.model("tables", Schema);

module.exports = tables;
