/* Create a burger model with columns for "burger_name" (DataTypes.STRING), and "devoured" (DataTypes.BOOLEAN).*/

module.exports = function(sequelize, DataTypes) {
    var burgers = sequelize.define("burgers", {
        
        burger_name: {
            type: DataTypes.STRING 
        },
        devoured: { 
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }
    }, {
        timestamps: false
    }
    );

    burgers.associate = function(models) {
        // We're saying that a Burger should belong to an Customer
        // A Burger can't be created without an Customer due to the foreign key constraint
        burgers.belongsTo(models.customers, {
          foreignKey: {
            allowNull: false
          }
        });
      };

    return burgers;
};