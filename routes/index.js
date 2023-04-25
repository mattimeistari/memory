const express = require('express');
const fs = require('fs');
const router = express.Router();

// get index page
router.get('/', (req, res) => {
    res.render('index', { title: '.' });
});

// post login page
router.post('/', (req, res) => {

    fs.readFile("./json/users.json", "utf8", (err, data) => {
        if (err) {
            console.log(`Lesskilningur er ekki nægur: ${err}`.red);
        } else {
            const usersArray = JSON.parse(data);
    
            const username = req.body.username
            const password = req.body.password
            const pfp = req.body.profpic
    
            // make for loop to make new id autoincrement
            let maxID = 0;
    
            for (let i = 0; i < usersArray.length; i++) {
                if (usersArray[i].id > maxID) {
                    maxID = usersArray[i].id;
                }
            }
            
            const newID = maxID + 1 || 1;
            
            usersArray.push({
                id: newID,
                userName: username,
                password: password,
                pfp: pfp,
                highScore: 0,
            });
    
            const updatedData = JSON.stringify(usersArray);
    
            fs.writeFile("./json/users.json", updatedData, "utf8", (err) => {
                if (err) {
                    console.log(`Villa við uppfærslu á skrá: ${err}`.red);
                    
                } else {
                    console.log("Notandi bættur við í skrá!".green);
                    res.redirect('/');
                }
            });
        }
    });

});

module.exports = router;
