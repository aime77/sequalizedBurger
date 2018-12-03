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


router.post('/api/customer', (req, res) => {
    //ADD CUSTOMER IF IT'S NOT ALREADY ON THE LIST
    db.Customers.findOrCreate({ where: { email: req.body.email } })
        .spread(async function (customers, created) {

            const objEmail = await customers.get({
                plain: true
            });

            return objEmail;

        }).then(function () { });
    //INSERT TO BILLS TABLE ACCORDING TO SELCTED CUSTOMER 

    console.log('buger' + req.body.burger_name);
    db.Hamburgers.findAll({}, { where: { id: req.body.burger_name } })
        .then(async (hamburgers) => {
            let objPrice;
            objPrice = await hamburgers[0].dataValues.price;
            db.Bills.create({

                billTotal: req.body.quantity * objPrice,
                customers: [{ email: req.body.email }]
            }, {
                    include: [{
                        model: db.Customers,
                        as: 'customers'
                    }]
                }).then(function () { console.log('created!!') });;

        })


        //INSERT TO ORDERS TABLE ACCORDING TO HAMBURGER 
        .then(function () {

            db.Orders.create({
                quantity: req.body.quantity,
                burgers: [{ burger_name: req.body.burger_name }]
            }, {
                    include: [{ model: db.Hamburgers, as: 'burgers' }]
                })

        })
        .then((results) => {
            res.json(results);
            //res.redirect('/');
        })
})

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

//CREATE A TABLE WITH ALL ORDERS
router.get('/api/orders', function (req, res) {
    db.Orders.findAll({ where: { ordersId: true } },
        { include: [{ model: db.Hamburgers }] }
    ).then((results) => {
        res.render('orders', { oders: results });
    });
})

//CREATE A TABLE TO CASH ORDERS
router.get('/api/customersTotal', function (req, res) {
    db.Bills.findAll({ where: { customersId: true } },
        { include: [{ model: db.Customers }] }
    ).then((results) => {
        res.render('bills', { bills: results });
    });
})


module.exports = router;
