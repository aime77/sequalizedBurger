const express = require('express');
const router = express.Router();
const db = require('../models');

router.get("/", (req, res) => {
    db.Hamburgers.findAll({}).then((results) => {
        res.render('index', { burgers: results });
    });
});

router.post('/api/burgers', (req, res) => {
    db.Hamburgers.create({
        burger_name: req.body.burger_name,
        customer_name:req.body.customer_name,
    },
        {
            include:
                [{
                    association: Bill.Customer,
                    include: Customer.Hamburgers
                }]
        }).then((results) => {
            res.json(results);
        })
});

router.put("/api/burgers/:id", function (req, res) {
    db.Hamburgers.update({
        devoured: req.body.devoured,
    },
        {
            where: {
                id: req.params.id
            }
        }).then(function () {
            res.end();
        })
});

module.exports = router;
