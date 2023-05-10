const express = require("express");
const fs = require("fs");
const router = express.Router();
const path = require("path");
const colors = require("colors");
const session = require("express-session");
const usersData = fs.readFileSync("./json/users.json");
const users = JSON.parse(usersData);

// Route handlers
router.get("/", (req, res) => {

    // Middleware functions, Log request details
    console.log(`${req.method} ${req.url} ${new Date()}`);

    // Redirect if no login
    if (!req.session.isLoggedIn) (
        res.redirect("/?status=fail")
    );

    // pfp code
    const { userName, pfp } = req.session;
    if (!pfp) {
        console.log(`Failed to find ${pfp}`)
    } else {
        console.log(`User ${userName}'s profile picture ${pfp} successfully loaded`)
    }

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
    
    // Initialize session variables if not present
    if (!req.session.deck) {
        req.session.deck = deck;
    }

    if (!req.session.cardsNames) {
        req.session.cardsNames = cardsNames;
    }

    if (!req.session.cards) {
        console.log("Deck created".red);
        req.session.cards = [];
        req.session.cardsTitles = [];
        for (let i = 0; i < 8; i++) {
            const random = Math.floor(Math.random() * req.session.deck.length);
            req.session.cards.push(req.session.deck.splice(random, 1)[0]);
            req.session.cardsTitles.push(req.session.cardsNames.splice(random, 1)[0]);
        }
    }
    let cardsTitles = req.session.cardsTitles;

    // prtint cardsnames
    console.log(cardsTitles);

    // skorboard kóði
    let topPlayers = users
    .map((user) => ({
        username: user.userName,
        highScore: user.highScore || 0,
    }))
    .sort((a, b) => b.highScore - a.highScore)
    .slice(0, 9);

    res.render("game", { title: ".", userName, pfp, cards: req.session.cards, deck: req.session.deck, cardsTitles: req.session.cardsTitles, topPlayers });
});

router.post("/", (req, res) => {
    res.redirect("/")
});

module.exports = router;