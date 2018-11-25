module.exports = function (sequelize, DataTypes) {
    const Hamburgers = sequelize.define('Hamburgers', {
        burger_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                is: ["^[a-z]+$", 'i'],
            }
        },
        devoured: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false
        },
    }
    );
    return Hamburgers;
}

