

module.exports = function (sequelize, DataTypes) {
    const Bills = sequelize.define('Bills', {
        billTotal: {
            type: DataTypes.INTEGER(11).UNSIGNED.ZEROFILL,
            allowNull: false,
            validate: { min: 2, max: 200 }
        },
        cashed: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false
        },
    });

    Bills.associate = function (models) {
        Bills.belongsToMany(models.Hamburgers, {as:'Hamburgers', through: 'Statements' })
        Bills.belongsToMany(models.Customer, { as:'Customer', through: 'Clients' });
    }

    return Bills;
}
