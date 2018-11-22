var express = require("express");

var router = express.Router();

// Import the model (burgers.js) to use its database functions.
var db = require("../models");

// Create all our routes and set up logic within those routes where required.
router.get("/", function(req, res) {
    console.log("db.burgers: ", db.burgers);
    let arrBurgers = []
    let query = {};
    db.burgers.findAll({
      where: query, include: [db.customers]
    }).then(function(results) {
      console.log("controller results: ", results);
      if (results.length > 0) {
        console.log("results[0]: ", results[0].dataValues);
        for (let i = 0; i < results.length; i++) {
          arrBurgers.push(results[i].dataValues);
          console.log("returned customer: ", results[i].dataValues.customer.name);
        }
        console.log("arrBurgers: ", {burgers: arrBurgers});
        res.render("index", {burgers: arrBurgers});
      } else {
        res.render("index", {burgers: arrBurgers});
      }
    });
    // db.Burgers.findAll(function(data) {
    //   var hbsObject = {
    //     burgers: data
    //   };
    //   console.log("burgers controller.js hbsObject: ", hbsObject);
    //   res.render("index", hbsObject);
    // });
  });
  
  // Post is insert a new burger
  router.post("/api/burgers", function(req, res) {
    console.log("req.body: ", req.body);
    db.burgers.create({
      burger_name: req.body.burger_name, 
      devoured: req.body.devoured,
      customerId: req.body.customerid
    }).then(function(results){
      res.json({ id: results.insertId });
    });
    // db.burgers.insertOne([
    //   "burger_name", "devoured"
    // ], [
    //   req.body.burger_name, req.body.devoured
    // ], function(result) {
    //   // Send back the ID of the new quote
    //   res.json({ id: result.insertId });
    // });
  });
  
  // Put is an update 
  router.put("/api/burgers/:id", function(req, res) {
    var condition = "id = " + req.params.id;
    console.log("req.params.id: ", req.params.id);
    console.log("controller Put condition: ", condition);
    console.log("req.body.devoured: ", req.body);
    db.burgers.update({
      devoured: req.body.devoured}, {
        where: {
          id: req.params.id
      }
    }).then(function(results){
      res.json(results);
      if (results.changedRows == 0) {
        // If no rows were changed, then the ID must not exist, so 404
        return res.status(404).end();
      } else {
        res.status(200).end();
      }
    });
    // db.burgers.updateOne({
    //   devoured: req.body.devoured
    // }, condition, function(result) {
    //   if (result.changedRows == 0) {
    //     // If no rows were changed, then the ID must not exist, so 404
    //     return res.status(404).end();
    //   } else {
    //     res.status(200).end();
    //   }
    // });
  });

  // /api/customer
// This Post is insert a new customer
router.post("/api/customers", function(req, res) {
  console.log("Customer Post req.body: ", req.body);
  db.customers.create({
    name: req.body.name
  }).then(function(results){
    res.json({ id: results.insertId });
  });
  // db.burgers.insertOne([
  //   "burger_name", "devoured"
  // ], [
  //   req.body.burger_name, req.body.devoured
  // ], function(result) {
  //   // Send back the ID of the new quote
  //   res.json({ id: result.insertId });
  // });
});

// get route for customers
router.get("/api/customers", function(req, res) {
  // console.log("db.burgers: ", db.burgers);
  let arrCustomers = []
  db.customers.findAll({}).then(function(results) {
    // console.log("typeof: ", results);
    if (results.length > 0) {
      res.json(results);
    } else {
      res.json(results);
    }
  });
  // db.Burgers.findAll(function(data) {
  //   var hbsObject = {
  //     burgers: data
  //   };
  //   console.log("burgers controller.js hbsObject: ", hbsObject);
  //   res.render("index", hbsObject);
  // });
});

// Export routes for server.js to use.
module.exports = router;