"use strict";

module.exports = function(sequelize, DataTypes) {
  const Orders = sequelize.define("Orders", {});
  Orders.association = function(models) {
    Orders.belongsTo(
      models.Hamburgers,
      { as: "hamburgers" },
      {
        foreignKey: {
          name: "hamburgersId",
          allowNull: false
        }
      }
    ),
      Orders.belongsTo(
        models.Bills,
        { as: "bills" },
        {
          foreignKey: {
            name: "billsId",
            allowNull: false
          }
        }
      );
  };
  return Orders;
};
