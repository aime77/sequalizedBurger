module.exports = function (sequelize, DataTypes) {
    const Customer = sequelize.define('Customer', {
        customerName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                is: ["^[a-z]+$", 'i'],
            }
        }
    });
    Customer.Bill=Customer.belongsTo(Bill);
    Customer.Hamburger=Customer.hasMany(Hamburger);
    return Customer;
}