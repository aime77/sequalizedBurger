module.exports = function (sequelize, DataTypes) {
    const Customers = sequelize.define('Customers', {
        // customer_name: {
        //     type: DataTypes.STRING,
        //     allowNull: false,
        //     validate: {
        //         is: ["^[a-z]+$", 'i'],
        //     }
        // },

        email: {
            type: DataTypes.STRING,
            isEmail: true,
            notEmpty: true,
            notNull: true,
        },
        // customer_id: {
        //     type: DataTypes.INTEGER,
        //     references: {
        //         model: "Customers",
        //         key: "id"
        //     }
        // }
    });
    Customers.associate = function (models) {
        Customers.hasMany(models.Bills, { as: 'customers' },
            { foreignKey: { name: 'customersId' } },
            { onDelete: 'cascade' });
    }
    return Customers;
}

