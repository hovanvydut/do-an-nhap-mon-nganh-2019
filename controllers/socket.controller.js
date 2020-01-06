function socketController(server) {
    const io = require("socket.io")(server);
    const menuModel = require("../models/menu.model");
    const tableModel = require("../models/table.model");
    const histories = require("../models/history.model");

    io.on("connection", function(socket) {
        // menu-list event
        console.log(socket.id);
        menuModel.find({}).exec((err, docs) => {
            socket.emit("menu-list", docs);
        });
        tableModel.find({}).exec((err, docs) => {
            socket.emit("bevarage-list", docs);
        });

        // Dữ liệu được từ /waiter lên server
        socket.on("sendList", data => {
            new histories({
                employeeID: data.userID,
                numTable: data.numTable,
                list: data.list
            })
                .save()
                .then(value => {
                    console.log(value);
                    io.emit("sendListToManager", value);
                });
        });
        socket.on("getAllDataFromDBHistories", () => {
            histories.find({}).then(value => {
                io.emit("returnAllDataFromDBHistories", value);
            });
        });
    });
}

module.exports = socketController;
