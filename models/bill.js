

module.exports = function (sequelize, DataTypes) {
    const Bills = sequelize.define('Bills', {
        billTotal: {
            type: DataTypes.INTEGER(11).UNSIGNED.ZEROFILL,
            allowNull: false,
            defaultValue: 0,
            validate: { min: 2, max: 200 }
        },
        cashed: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false
        },
        customer_id: {
            type: DataTypes.INTEGER,
            foreignKey:true,
            references: {
                model: "Customers",
                key: "primaryCust_id"
            }
        },
        burger_id: {
            type: DataTypes.INTEGER,
            foreignKey:true,
            references: {
              model: "Hamburgers",
              key: "primaryBurger_Id"
            }
        },
    });

    return Bills;
}
