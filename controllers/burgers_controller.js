const express = require('express');
const router = express.Router();
const burger = require('../models/burger.js');

//route to get all info for the client and render it 
router.get("/", (req, res) => {
    burger.selectAll(data => {
        let hbsObj = {
            burgers: data
        };
        console.log(hbsObj);
        res.render("index", hbsObj);
    });
});

//route to insert data to table from user input
router.post('/api/burgers', (req, res) => {
    burger.insertOne(['burger_name'],
        [req.body.burger_name]
        , (result) => {
            console.log(req.body.name);
            res.json({ id: result.insertId })
        });
});

router.put("/api/burgers/:id", function (req, res) {
    var condition = "id = " + req.params.id;

    console.log("condition", condition);

    burger.updateOne({
        devoured: req.body.devoured
    }, condition,  (result)=> {
        if (result.changedRows == 0) {
            // If no rows were changed, then the ID must not exist, so 404
            console.log(result);
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});

module.exports = router;