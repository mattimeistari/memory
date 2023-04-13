const express = require('express');
const fs = require('fs');
const router = express.Router();
const path = require("path");
const colors = require("colors");
const session = require("express-session");

// get buffer page
router.get('/', (req, res) => {
    // check if the client has a valid session
    if (req.session.isLoggedIn) {
        // if yes, redirect them to the game page
        res.redirect('/game');
    } else {
        // if not, redirect them to the index page
        res.redirect("/?status=fail");
    }
});

// post buffer page
router.post('/', (req, res) => {

    const file = fs.readFileSync('./json/users.json');
    const data = JSON.parse(file);
    let login = false;
    for(let i = 0; i < data.length; i += 1) {
        if (req.body.username == data[i].userName && 
            req.body.password == data[i].password) {
            // if the credentials match, set the session properties
            req.session.userName = req.body.username;
            req.session.pfp = data[i].pfp;
            req.session.isLoggedIn = true;
            login = true;
            console.log(`user ${data[i].userName} has logged in.`.blue);
            // redirect the client to the game page
            res.redirect('/game');
        }
    }

    // if no match is found, redirect the client to the index page
    if (!login) {
        res.redirect("/?status=fail");
    }
    
});

module.exports = router;