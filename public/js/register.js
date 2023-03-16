const express = require("express");
const path = require("path");
require("colors");
const session = require("express-session");

fs.readFileSync('./json/users.json', "utf8", (err, data) => {
    console.log("hallo1");
if (err) {
    console.log(`Lesskilningur er ekki nægur:" ${err}`);
} else {
    const data = JSON.parse(file);

    data.push({
        "id": "x",
        "userName": "nameInput",
        "password": "passInput",
        "pfp": "pfpInput"
    });
});




