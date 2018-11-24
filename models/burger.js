module.exports = function (sequelize, DataTypes) {
    var Hamburgers = sequelize.define('Hamburgers', {
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
        // customerName: {
        //     type: DataTypes.STRING,
        //     allowNull: false,
        //     validate: {
        //         is: ["^[a-z]+$", 'i'],
        //     }
        // }
    });
    return Hamburgers;
}