const express = require('express');
const fs = require('fs');
const router = express.Router();
const session = require('express-session');

// session code
router.use(session({
    secret: 'i<3MyGirlfriend',
    resave: false,
    saveUninitialized: false
}));

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
            req.session.userName = req.body.username;
            req.session.pfp = data[i].pfp;
            req.session.isLoggedIn = true;
            login = true;
            console.log(`user ${data[i].userName} has logged in.`.blue);
        }
    }
    if (login) {
        const userName = req.session.userName;
        const pfp = req.session.pfp;
        console.log(userName);
        console.log(pfp);
        res.render('game', { title: '.', userName, pfp });
    } else {
        res.redirect('/?status=fail');
    }
});

module.exports = router;