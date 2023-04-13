const express = require('express');
const fs = require('fs');
const router = express.Router();
const session = require('express-session');

router.post('/', (req, res) => {

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

    const cards = req.session.deck.splice(random, 1);
    for(let i = 0; i < 4; i++) {
        const random = Math.floor(Math.random() * 52);
        cards.push(req.session.deck.splice(random, 1));
        console.log(cards);
    }

    const numberOneTo52 = Math.floor(Math.random() * 52) + 1;

    if (login) {
        console.log(userName);
        console.log(pfp);
        res.render('game', { title: '.', userName, pfp, cards, deck, numberOneTo52, cardsNames });
    } else {
        res.redirect('/?status=fail');
    }
});

    // get login
    function checkLoggedIn(req, res, next) {
        if (req.session.isLoggedIn) {
            next();
        } else {
            res.redirect('/');
        }
    }

router.get('/', checkLoggedIn, (req, res) => {

    // deck

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

    const cards = []
    for(let i = 0; i < 4; i++) {
        const random = Math.floor(Math.random() * 52);
        cards.push(req.session.deck.splice(random, 1));
        console.log(cards);
    }

    if (!req.session.deck) {
        req.session.deck = deck;
    }

    const userName = req.session.userName;
    const pfp = req.session.pfp;

    res.render('game', { title: '.', userName, pfp, cards, deck, numberOneTo52, cardsNames });

});

module.exports = router;