const express = require('express');
const router = express.Router();
const db = require('../models/burgers.js')



//route to get all info for the client and render it 
router.get("/", (req, res) => {
    db.Burgers.findAll({}).then((results) => {
        res.render('index', results);
    });
});

//route to insert data to table from user input
router.post('/api/burgers', (req, res) => {
    db.Burgers.create({
        burger_name: req.body.burger_name,
    }).then((results) => {
        res.render('index', results);
    })
});

router.put("/api/burgers/:id", function (req, res) {
    db.Burgers.update({
        devoured: req.body.devoured,
    },
        {
            where: {
                id: req.params.id
            }
        }).then((results) => {
            res.end();
        })
});

module.exports = router;