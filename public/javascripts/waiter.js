const socket = io("http://localhost:3000");
// var role = "NV1";
let tea, juice, coffee, softDrink, iceCream;
socket.on("menu-list", function(data) {
    /* load list menu from db */
    tea = data.filter(item => item.type == "tea");
    juice = data.filter(item => item.type == "juice");
    coffee = data.filter(item => item.type == "cafe");
    softDrink = data.filter(item => item.type == "soft-drink");
    iceCream = data.filter(item => item.type == "ice-cream");

    /* insert HTML */
    teaList.innerHTML = listHTML(tea);
    coffeeList.innerHTML = listHTML(coffee);
    juiceList.innerHTML = listHTML(juice);
    softDrinkList.innerHTML = listHTML(softDrink);
    iceCreamList.innerHTML = listHTML(iceCream);

    /* Tăng giảm số lượng */
    let plusIcon = document.getElementsByClassName("plus-icon");
    let negativeIcon = document.getElementsByClassName("negative-icon");
    let listItemCount = document.getElementsByClassName("list-item__count");
    for (let i = 0; i < plusIcon.length; i++) {
        plusIcon[i].addEventListener("click", function() {
            if (document.getElementById("numTable").innerText == "Bàn") {
                alert("Chưa chọn bàn");
                return;
            }
            listItemCount[i].innerHTML = Number(listItemCount[i].innerHTML) + 1;

            /* Khi nhấn vào plusicon hoặc negative icon thì cập nhật vào trang pay-page */
        });
    }
    for (let i = 0; i < negativeIcon.length; i++) {
        negativeIcon[i].addEventListener("click", function() {
            if (Number(listItemCount[i].innerHTML) > 0)
                listItemCount[i].innerHTML =
                    Number(listItemCount[i].innerHTML) - 1;
        });
    }
    socket.emit("my other event", {
        my: "home page"
    });
});

socket.on("bevarage-list", function(data) {
    console.log(data);
});

function listHTML(data) {
    let dataHTML = "";
    for (let i = 0; i < data.length; i++) {
        dataHTML += `<li class="list-item list-item--bg${(i % 2) + 1}">
        <div class="list-item__icon negative-icon">
        <img src="/public/images/waiter/icons/negative.svg" alt="negative-icon">
        </div>
        <div class="list-item__drink-name">
        <p class="name">${data[i].name}</p>
        </div>
        <div class="list-item__count-and-price">
        <p class="list-item__count">0</p>
        <p class="list-item__price">x${data[i].price}k</p>
        </div>
        <div class="list-item__icon plus-icon" value=${data[i].name}>
        <img src="/public/images/waiter/icons/plus.svg" alt="plus-icon">
        </div>
        </li>`;
    }
    return dataHTML;
}

// OPEN CLOSE MENU
let headerLayoutElm = document.getElementsByClassName("header__layout-elm")[0];
let leftMenu = document.getElementsByClassName("left-menu")[0];
let coverFullPage = document.getElementsByClassName("cover-full-page")[0];

headerLayoutElm.addEventListener("click", function() {
    leftMenu.classList.add("left-menu--open");
    coverFullPage.classList.add("cover-full-page--open");
});
coverFullPage.addEventListener("click", function() {
    leftMenu.classList.remove("left-menu--open");
    coverFullPage.classList.remove("cover-full-page--open");
});

// RIGHT-TAB
let rightTabLayout = document.getElementsByClassName("right-tab__layout");
let listMerchandise = [];
for (let i = 0; i < rightTabLayout.length; i++) {
    let id = rightTabLayout[i].id.replace("-icon", "") + "-list"; // convert 'coffee-icon' --> 'coffee-list'
    listMerchandise.push(document.getElementById(id));
}
// default: chỉ có danh sách sản phẩm cafe (right-tab) hiển thị, còn lại ẩn hết
for (let j = 0; j < listMerchandise.length; j++) {
    listMerchandise[j].classList.add("list-merchandise--close"); // ẩn
}
listMerchandise[0].classList.remove("list-merchandise--close"); // hiện cafe list
// add event for each tab
for (let i = 0; i < rightTabLayout.length; i++) {
    rightTabLayout[i].addEventListener("click", function() {
        for (let j = 0; j < rightTabLayout.length; j++) {
            rightTabLayout[j].classList.remove("right-tab--active"); // unactive for all tab
            listMerchandise[j].classList.add("list-merchandise--close"); // display: none for all ul
        }
        rightTabLayout[i].classList.add("right-tab--active");
        listMerchandise[i].classList.remove("list-merchandise--close");
    });
}

// LIST-DRINK
let coffeeList = document.getElementById("coffee-list");
let teaList = document.getElementById("tea-list");
let juiceList = document.getElementById("juice-list");
let softDrinkList = document.getElementById("soft-drink-list");
let iceCreamList = document.getElementById("ice-cream-list");

// PAY
let payPage = document.getElementsByClassName("pay-page")[0];
let creditCardBtn = document.getElementById("credit-card-btn");
let leftArrow = document.getElementsByClassName("left-arrow")[0];

creditCardBtn.addEventListener("click", function() {
    arr = document.getElementsByClassName("name");
    arr2 = document.getElementsByClassName("list-item__count");
    arr3 = document.getElementsByClassName("list-item__price");
    var ul = document.getElementById("pay-pal__list");
    ul.innerHTML = "";
    var sum = 0;
    for (var i = 0; i < arr.length; i++) {
        if (arr2[i].innerText != "0") {
            console.log(arr[i].innerText + "-" + arr2[i].innerText);
            var sumPrice =
                Number(arr2[i].innerText) *
                Number(
                    arr3[i].innerText.substr(1, arr3[i].innerText.length - 2)
                );
            sum += sumPrice;

            var li = document.createElement("li");
            li.appendChild(
                document.createTextNode(
                    arr[i].innerText +
                        "---" +
                        arr2[i].innerText +
                        " " +
                        arr3[i].innerText +
                        " = " +
                        sumPrice +
                        "k"
                )
            );
            ul.appendChild(li);
        }
    }
    document.getElementById("sumPrice").innerText = sum + "k";
    payPage.style.transform = "translate(0, 0)";
});
leftArrow.addEventListener("click", function() {
    payPage.style.transform = "translate(100%, 0)";
});

// NOTIFICATION
let notifcationPage = document.getElementsByClassName("notifcation-page")[0];
let notifcationBtn = document.getElementById("notification-btn");
let leftArrow2 = document.getElementsByClassName("left-arrow")[1];

notifcationBtn.addEventListener("click", function() {
    notifcationPage.style.transform = "translate(0, 0)";
});
leftArrow2.addEventListener("click", function() {
    notifcationPage.style.transform = "translate(100%, 0)";
});

// MODAL BOX
let righttabTable = document.getElementById("right-tab__table");
let modalbox = document.getElementsByClassName("modal-box")[0];
let modalboxTable = document.getElementsByClassName("modal-box__table");
let modalboxIconClose = document.getElementById("modal-box__icon-close");

righttabTable.addEventListener("click", function() {
    // mặc định là ẩn, vì vậy muốn hiện thì phải remove class modal-box--close
    modalbox.classList.remove("modal-box--close");
});

modalboxIconClose.addEventListener("click", function() {
    modalbox.classList.add("modal-box--close");
});

/* for (let i = 0; i < modalboxTable.length; i++) {
    modalboxTable[i].addEventListener('click', event => {
        modalboxTable[i].classList.add
    })
} */
// HUy tuong xu lis nhaaaaa
function selectTable(e) {
    document.getElementById("numTable").innerText = e.innerText;
    document.getElementById("numTable2").innerText = e.innerText;
    modalbox.classList.add("modal-box--close");
    arr2 = document.getElementsByClassName("list-item__count");
    for (var i = 0; i < arr2.length; i++) {
        arr2[i].innerText = "0";
    }
}

function emitList() {
    if (document.getElementById("numTable").innerText == "Bàn") {
        alert("Chưa chọn bàn");
        return 0;
    }
    let yourname = document.getElementsByClassName("yourname")[0];

    let data = {
        numTable: document.getElementById("numTable").innerText,
        userID: yourname.dataset.userid,
        role: yourname.dataset.role,
        list: [],
        time: new Date().toUTCString()
    };

    // Lay du lieu
    let arr = document.getElementsByClassName("name");
    let arr2 = document.getElementsByClassName("list-item__count");
    for (var i = 0; i < arr.length; i++) {
        if (arr2[i].innerText != "0") {
            data.list.push({
                name: arr[i].innerText,
                num: Number(arr2[i].innerText)
            });
        }
    }

    //Gui du lieu
    console.log(data);
    socket.emit("sendList", data);
    //Xoa DL
    arr2 = document.getElementsByClassName("list-item__count");
    for (var i = 0; i < arr2.length; i++) {
        arr2[i].innerText = "0";
    }
    document.getElementById("pay-pal__list").innerHTML = "Danh sách trống";
    document.getElementById("numTable").innerText = "Bàn";
    document.getElementById("numTable2").innerText = "Bàn";
}
