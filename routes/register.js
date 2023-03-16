const express = require('express');
const fs = require('fs');
const router = express.Router();

// get login page
router.get('/', (req, res) => {
    res.render('register', { title: '.register' });
});

// post login page
router.post('/', (req, res) => {
    res.render('register', { title: '.register' });
});

module.exports = router;