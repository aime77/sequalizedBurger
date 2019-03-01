const express = require("express");
const router = express.Router();
const db = require("../models");

//INDEX VIEW
//get burgers' names to provide a drop down list of all burgers
router.get("/", (req, res) => {
  db.Hamburgers.findAll({}).then(results => {
    res.render("index", { burgers: results });
  });
});

router.post("/api/customer", (req, res) => {
  //ADD CUSTOMER IF IT'S NOT ALREADY ON THE LIST
  db.Customers.findOrCreate({ where: { email: req.body.email } })
    .spread(async function(customers, created) {
      const objEmail = await customers.get({
        plain: true
      });
      return objEmail;
    })
    .then(function() {});

  //INSERT TO BILLS TABLE ACCORDING TO SELECTED CUSTOMER
  db.Hamburgers.findAll({}, { where: { id: req.body.burger_name } })
    .then(async hamburgers => {
      let objPrice;
      objPrice = await hamburgers[0].dataValues.price;
      db.Bills.create(
        {
          billTotal: req.body.quantity * objPrice,
          customers: [{ email: req.body.email }]
        },
        {
          include: [
            {
              model: db.Customers,
              as: "customers"
            }
          ]
        }
      ).then(function() {
        console.log("bill created!!");
      });
    })

    .then(results => {
      res.json(results);
      //res.redirect('/');
    });
});

//UPDATE BILLS IF CASHED
router.put("/api/customer/bills/:id", function(req, res) {
  db.Bills.update(
    {
      cashed: req.body.cashed
    },
    {
      where: {
        id: req.params.id
      }
    }
  ).then(function() {
    res.end();
  });
});

//CREATE A TABLE WITH ALL BILLS
router.get("/api/customer/bills", function(req, res) {
  db.Bills.findAll(
    { include: [{ model: db.Customers, as: "customers" }] }
  ).then(results => {
      console.log(results);
    res.render("bills", { bills: results });
  });
});

//CREATE A TABLE WITH ALL CUSTOMERS
router.get("/api/customers/info", function(req, res) {
  db.Customers.findAll(
    { group: "email" },
    { include: [{ model: db.Customers }] }
  ).then(results => {
    res.render("customers", { customers: results });
  });
});

module.exports = router;
