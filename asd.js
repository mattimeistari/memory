const express = require('express');
const fs = require('fs');
const router = express.Router();
const session = require('express-session');

router.get('/', (req, res) => {

    // Cards code
    const sorts = ["hearts", "spades", "clubs", "diamonds"];
    const numbers = ["ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "jack", "queen", "king"];
    const deck = [];
    const cardsNames = [];
    for(let i = 0; i < sorts.length; i++) {
        for(let j = 0; j < numbers.length; j++) {
            deck.push(`${numbers[j]}_of_${sorts[i]}`);
            cardsNames.push(`${numbers[j]} of ${sorts[i]}`);
        }
    }
    
    if (!req.session.deck) {
        req.session.deck = deck;
    }

    const cards = [];
    for(let i = 0; i < 4; i++) {
        const random = Math.floor(Math.random() * 52);
        cards.push(req.session.deck.splice(random, 1));
        console.log(cards);
    }
    // Cards code end


    // Login code
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

    if (req.session.isLoggedIn) {
        const name = req.session.username;
        const image = jerryImage[0];
        res.render('jerry', { title: 'Jerry', name, image, cards, tempDeck: req.session.deck });
    } else {
        res.redirect('/');
    }

    
});

router.post('/', checkLoggedIn, (req, res) => {

    const userName = req.session.userName;
    const pfp = req.session.pfp;
    res.render('game', { title: '.', userName, pfp });

});

module.exports = router;