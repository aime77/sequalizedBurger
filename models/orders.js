'use strict';

module.exports = function (sequelize, DataTypes) {
    const Orders = sequelize.define('Orders', {

    });
    Orders.association = function (models) {
        Orders.belongsTo(models.Hamburgers, { as: 'burgers' },
            {
                foreignKey: {
                    name: 'burgersId',
                    allowNull: false
                }
            }),
            Orders.belongsTo(models.Bills, {as:'bills'},
            {
                foreignKey: {
                    name: 'billsId',
                    allowNull: false
                    }
            })
    }
    return Orders
}



