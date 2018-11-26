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
            type: DataTypes.INTEGER(11).UNSIGNED.ZEROFILL,
            allowNull: false,
            validate: { min: 1, max: 20 }
        },
    }
    );
    Hamburgers.associate = function (models) {
    Hamburgers.belongsToMany(models.Bills, { as: 'Bills', through: 'Statements' });
    }
    return Hamburgers;

}

