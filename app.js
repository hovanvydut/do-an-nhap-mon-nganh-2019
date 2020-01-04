require("dotenv").config();
const createError = require("http-errors");
const mongoose = require("mongoose");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

// connect db
mongoose.connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function() {
    console.log("CONNECT DB SUCCESS");
});

const app = express();

// Load router module
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const loginRouter = require("./routes/login.route");
const waiterRouter = require("./routes/waiter.route");
const logoutRouter = require("./routes/logout.route");

const authMiddleware = require("./middlewares/auth.middleware");

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
    `/${process.env.STATIC_PATH}`,
    express.static(path.join(__dirname, "public"))
);

app.use("/", indexRouter);
app.use("/waiter", authMiddleware, waiterRouter);
app.use("/users", usersRouter);
app.use("/login", loginRouter);
app.use("/logout", logoutRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render("error");
});

module.exports = app;
