

module.exports = function (sequelize, DataTypes) {
    const Bills = sequelize.define('Bills', {
        billTotal: {
            type: DataTypes.INTEGER(2).UNSIGNED.ZEROFILL,
            allowNull: false,
            defaultValue: 0,
            validate: { min: 2, max: 200 }
        },
        cashed: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false
        },

    });

    Bills.associate = function (models) {
        Bills.belongsTo(models.Customers, { as: 'customers' }, { foreignKey: { name: 'customersId', allowNull: false } })
        Bills.hasMany(models.Orders, { as: 'bills' }, { foreignKey: { name: 'billsId' } })
    }

    return Bills;
}
