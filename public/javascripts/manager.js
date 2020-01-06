const socket = io("http://localhost:3000");
function getAllDataFromDBHistories() {
    socket.emit("getAllDataFromDBHistories");
}
socket.on("sendListToManager", function(data) {
    console.log(data);
});
socket.on("returnAllDataFromDBHistories", function(data) {
    console.log("returnAllDataFromDBHistories: ", data);
});

function showNoti() {
    document.getElementById("noti").style.right = "0px";
}
function hideNoti() {
    document.getElementById("noti").style.right = "-300px";
}
function add() {
    //dataExam
    var data = {
        table: 01,
        NV: "NV_001",
        time: "11:00 21/12/2019",
        size: 2,
        name: ["Cafe đen", "Cafe sữa"],
        number: [1, 2]
    };
    //them du lieu vao bang
    var table = document.getElementById("listOrder");
    var row = table.insertRow(2);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);
    cell1.innerHTML = data.table;
    cell2.innerHTML = data.NV;
    cell3.innerHTML = data.time;
    var list = "<ul>";
    for (var i = 0; i < data.size; i++) {
        list += "<li>" + data.number[i] + " - " + data.name[i] + "</li>";
    }
    list += "</ul>";
    cell4.innerHTML = list;
    cell5.innerHTML =
        '<i onclick="Done(this)" class="iconCheck fas fa-check-square"></i><br><i onclick="Cancel(this)" class="iconCancel fas fa-window-close"></i>';
    //Kiem tra du lieu on tai
}
function Done(e) {
    document
        .getElementById("listOrder")
        .deleteRow(e.parentNode.parentNode.rowIndex);
}
function Cancel(e) {
    document
        .getElementById("listOrder")
        .deleteRow(e.parentNode.parentNode.rowIndex);
}
