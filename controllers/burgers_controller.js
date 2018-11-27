const express = require('express');
const router = express.Router();
const db = require('../models');

//INDEX VIEW
//get burgers' names to provide a drop down list of all burgers 
router.get("/", (req, res) => {
    db.Hamburgers.findAll({

    }).then((results) => {
        res.render('index', { burgers: results });
    });
});

//ADD CUSTOMER IF IT'S NOT ALREADY ON THE LIST
router.post('/api/customer', (req, res) => {
    //finding if email exists
    db.Customer.findOne({ where: {attr1: req.body.email} }).then(function(resultsEmail){
    //if it exists redirect 
        if (results) {
        res.redirect('/api/customer/bill');
    //if it doesn't create a new customer 
        }else {
            db.Customer.create({
                email: req.body.email,
            }).then((customerEmail) => {
                res.redirect('/api/customer/bill');
               // res.json(results);
            })
        }
    })
})
   

    //enter a bill per hamburgers and customers
    router.post('/api/customer/bill', (req, res) => {
        db.Bill.create({
            billTotal: req.body.billTotal,
            hamburgers: [
                { burger_name: req.body.burger_name },
                { burger_name: req.body.burger_name },
            ]
        },
            {
                include:
                    [Hamburgers]
            }).then((results) => {
                res.json(results);
                //res.redirect('/');
            })

    });

    
    //UPDATE BILLS IF CASHED
    router.put("/api/customer/bill/:id", function (req, res) {
        db.Bill.update({
            cashed: req.body.cashed,
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
