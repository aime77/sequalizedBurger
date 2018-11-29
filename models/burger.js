module.exports = function (sequelize, DataTypes) {
    const Hamburgers = sequelize.define('Hamburgers', {
       
        burger_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                is: ["^[a-z]+$", 'i'],
            }
        },
        primaryBurger_Id: {
            type: DataTypes.UUID,
            allowNull: false,
            autoIncrement:true,
            primaryKey:true,
            references: {
              model: 'Bills',
              key: 'burger_id'
            }
          },
        price: {
            type: DataTypes.INTEGER(11).UNSIGNED.ZEROFILL,
            allowNull: false,
           defaultValue: 0,
            validate: { min: 1, max: 20 }
        },
        quantity: {
            type: DataTypes.INTEGER(11).UNSIGNED.ZEROFILL,
            allowNull: false,
            defaultValue: 0,
            validate: { min: 1, max: 20 }
        },
    });
    Hamburgers.associate = function (models) {
        Hamburgers.hasMany(models.Bills, { as: 'burgerBills'},  {foreignKey:'burger_id'}, {constraints:false});
       Hamburgers.belongsToMany(models.Customers, {as:'Customers', through: 'customerBurgers'});
    }
    
    return Hamburgers;

}

