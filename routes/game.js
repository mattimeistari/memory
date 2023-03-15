const express = require('express');
const fs = require('fs');
const router = express.Router();

// get game page
router.get('/', (req, res) => {
    res.redirect('/');
});

router.post('/', (req, res) => {
    const file = fs.readFileSync('./json/users.json');
    const data = JSON.parse(file);
    let login = false;
    for(let i = 0; i < data.length; i += 1) {
        if (req.body.username == data[i].userName && 
            req.body.password == data[i].password) {
            req.session.username = req.body.username;
            req.session.isLoggedIn = true;
            login = true;
            console.log(`user ${data[i].userName} has logged in.`.blue);
        }
    }
    if (login) {
        res.render('game', { title: '.' });
    } else {
        res.redirect('/?status=fail');
    }
});

module.exports = router;