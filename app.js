// This file is our "controller file" and is responsible for
// handling all of our routes
// and rendering our views.

// kemur í prófi
const express = require("express");
const path = require("path");
require("colors");
const session = require("express-session");

const indexPage = require("./routes/index");
const gamePage = require("./routes/game");
const registerPage = require("./routes/register");

const app = express();

// for body parser, leyfir req.body
app.use(express.urlencoded({extended: false}));

// 17 kemur í prófi. app.use setur upp static file server.
//serve static files
app.use(express.static(path.join(__dirname, "public")));
// __dirname finnur app.js skjal í hvaða tölvu sem er
// path.join tengir tvo ólíka strengi og makes it understandable file directory.

//template engine
app.set("views", (path.join(__dirname, "views")));
app.set("view engine", "ejs"); // set up ejs for templating => test

// session 
app.use(session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
}));

//kemur á prófi. setja upp routes eins og að skrifa youtube.com/channel i staðinn fyrir youtube.com
// routers
app.use("/", indexPage);
app.use("/game", gamePage);
app.use("/register", registerPage);

// errors : page not found
app.use((req, res, next) => {
    const err = new Error("Page not found");
    err.status = 404;
    next(err);
});

// handling errors
app.use((err, req, res) => {
    res.status(err.status || 500);
    res.send(err.message);
});

// setting up the server
app.listen(3000, () => {
    console.log("Allt er í lagi. Port 3000.......".green);
});