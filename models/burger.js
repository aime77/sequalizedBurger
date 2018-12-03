module.exports = function (sequelize, DataTypes) {
    const Hamburgers = sequelize.define('Hamburgers', {

        burger_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                is: ["^[a-z]+$", 'i'],
            }
        },
        price: {
            type: DataTypes.INTEGER(2).UNSIGNED.ZEROFILL,
            allowNull: false,
            defaultValue: 0,
            validate: { min: 1, max: 20 }
        },


    });
    Hamburgers.associate = function (models) {
        Hamburgers.hasMany(models.Orders, { as: 'burgers' },
            { foreignKey: { name: 'burgersId' } },);
    }
    return Hamburgers;
}

