module.exports = function (sequelize) {
    let Burgers = sequelize.define('burgers', {
        burger_name: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                is: ["^[a-z]+$", 'i'],
            }
        },
        devoured: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
            allowNull: false
        },
        customerName: {
            type: Sequalize.STRING,
            allowNull: false,
            validate: {
                is: ["^[a-z]+$", 'i'],
            }
        }
    });
    return Burgers;
}