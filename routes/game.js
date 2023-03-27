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
    const userName = req.session.userName;
    const pfp = req.session.pfp;

    // cards

    const sorts = ["hearts", "spades", "clubs", "diamonds"];
    const numbers = ["ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "jack", "queen", "king"];
    const deck = [];
    for(let i = 0; i < sorts.length; i++) {
        for(let j = 0; j < numbers.length; j++) {
            deck.push(`${numbers[j]}_of_${sorts[i]}`);
        }
    }

    // random deck creator
    const random = Math.floor(Math.random() * 52);

    // draw random card and remove it from the deck
    const card = deck.splice(random, 1);

    // random image
    const numberOneTo52 = Math.floor(Math.random() * 52) + 1;

    if (login) {
        console.log(userName);
        console.log(pfp);
        res.render('game', { title: '.', userName, pfp, card, deck, numberOneTo52 });
    } else {
        res.redirect('/?status=fail');
    }

});

module.exports = router;