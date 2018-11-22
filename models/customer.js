module.exports = function(sequelize, DataTypes) {
    var customers = sequelize.define("customers", {
      // Giving the customer model a name of type STRING
      name: DataTypes.STRING
    }, {
        timestamps: false
    });
  
    customers.associate = function(models) {
      // Associating customer with burgers
      // When an customer is deleted, also delete any associated Posts
      customers.hasMany(models.burgers, {
        onDelete: "cascade"
      });
    };
  
    return customers;
  };