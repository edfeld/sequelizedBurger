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
    });

    return burgers;
};