function socketController(server) {
    const io = require("socket.io")(server);
    const menuModel = require("../models/menu.model");
    const tableModel = require("../models/table.model");

    io.on("connection", function(socket) {
        // menu-list event
        menuModel.find({}).exec((err, docs) => {
            socket.emit("menu-list", docs);
        });
        tableModel.find({}).exec((err, docs) => {
            socket.emit("bevarage-list", docs);
        });
        socket.on("sendList", data => {
            console.log(data);
        });
    });
}

module.exports = socketController;
