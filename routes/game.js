const express = require("express");
const fs = require("fs");
const router = express.Router();
const path = require("path");
const colors = require("colors");
const session = require("express-session");


// Route handlers
router.get("/", (req, res) => {

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
    
        // Middleware functions, Log request details
        console.log(`${req.method} ${req.url} ${new Date()}`);
    
        // Initialize session variables if not present
        if (!req.session.deck) {
            req.session.deck = deck;
        }
    
        if (!req.session.cards) {
            console.log("hmm!!".red);
            req.session.cards = [];
            for (let i = 0; i < 4; i++) {
                const random = Math.floor(Math.random() * req.session.deck.length);
                req.session.cards.push(req.session.deck.splice(random, 1)[0]);
                console.log(req.session.cards);
            }
        }

    const { userName, pfp } = req.session;

    if (!pfp) {
        console.log("No pfp".orange);
    }

    res.render("game", { title: ".", userName, pfp, cards: req.session.cards, deck: req.session.deck, cardsNames });
});

router.post("/", (req, res) => {
    const { userName, pfp } = req.session;
    res.render("game", { title: ".", userName, pfp, cards: req.session.cards, deck: req.session.deck, cardsNames });
});

module.exports = router;