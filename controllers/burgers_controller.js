const express = require('express');
const router = express.Router();
const db = require('../models');

//INDEX VIEW
//get burgers' and customers' names to provide a drop down list of all burgers and customers' emails
router.get("/", (req, res) => {
    db.Hamburgers.findAll({}).then((results) => {
        res.render('index', { burgers: results });
    });

    db.Customers.findAll({}).then((results) => {
        res.render('index', { burgers: results });
    });
});

//enter order by burger (name and quantity) and customer (email) 
router.post('/api/burgers', (req, res) => {
    db.Hamburgers.create({
        burger_name: req.body.burger_name,
    },
        {
            include:
                [{
                    association: Bill.Customer,
                    include: Customer.Hamburgers
                }]
        }).then((results) => {
            res.json(results);
        });

    db.Hamburgers.create({
        burger_name: req.body.burger_name,
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

//ORDERS VIEW
//show orders and check total per customer 
router.get("/api/orders", (req, res) => {
    db.Hamburgers.findAll({}).then((results) => {
        res.render('orders', { burgers: results });
    });

    db.Customer.findAll({}).then((results) => {
        res.render('orders', { customer: results });
    });

    db.Bills.findAll({}).then((results) => {
        res.render('orders', { check: results });
    });
});

//update orders 
router.put("/api/orders/:id", function (req, res) {
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
