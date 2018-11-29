module.exports = function (sequelize, DataTypes) {
    const Customers = sequelize.define('Customers', {
        // customer_name: {
        //     type: DataTypes.STRING,
        //     allowNull: false,
        //     validate: {
        //         is: ["^[a-z]+$", 'i'],
        //     }
        // },
       primaryCust_Id: {
            type: DataTypes.UUID,
            primaryKey:true,
            allowNull: false,
            autoIncrement:true,
            references: {
              model: 'Bills',
              key: 'customer_id'
            }
          },
        
            email: {
                type: DataTypes.STRING,
                isEmail: true,
                notEmpty: true,
                notNull: true,
            }

        });
    Customers.associate = function (models) {
        Customers.hasMany(models.Bills, { as: 'customerBills' }, {foreignKey:'customer_id'}, {constraints:false});
        Customers.belongsToMany(models.Hamburgers, {as:'Hamburgers', through: 'customerBurgers'});
    }
    return Customers;
}

