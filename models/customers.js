module.exports = function(sequelize, DataTypes) {
  const Customers = sequelize.define("Customers", {
    email: {
      type: DataTypes.STRING,
      isEmail: true,
      notEmpty: true,
      notNull: true
    }
  });
  Customers.associate = function(models) {
    Customers.hasMany(
      models.Bills,
      { as: "customers" },
      { foreignKey: { name: "customersId" } },
      { onDelete: "cascade" }
    );
  };
  return Customers;
};
