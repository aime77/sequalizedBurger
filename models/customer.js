module.exports = function (sequelize, DataTypes) {
    const Customer = sequelize.define('Customer', {
        customer_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                is: ["^[a-z]+$", 'i'],
            }
        },
        email: {
            type: DataTypes.STRING,
            isEmail: true,
            notEmpty: true,
            notNull: true,
        }

    });
    Customer.associate = function (models) {
        Customer.hasMany(models.Bills, { as: 'Bills'});
    }
    return Customer;
}

