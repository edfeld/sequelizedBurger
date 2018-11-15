// Import the ORM to create functions that will interact with the database.
var orm = require("../config/orm.js");

var burgers = {
  // call select all in the ORM
  selectAll: function(cb) {
    orm.selectAll("burgers", function(res) {
      cb(res);
    });
  },
  // call the insertOne function in the ORM
  // The variables cols and vals are arrays.
  insertOne: function(cols, vals, cb) {
    orm.insertOne("burgers", cols, vals, function(res) {
      cb(res);
    });
  },
  // call the updateOne function in the ORM
  updateOne: function(objColVals, condition, cb) {
    orm.updateOne("burgers", objColVals, condition, function(res) {
      cb(res);
    });
  },
//   delete: function(condition, cb) {
//     orm.delete("burgers", condition, function(res) {
//       cb(res);
//     });
//   }
};

// Export the database functions for the controller (burgersController.js).
module.exports = burgers;