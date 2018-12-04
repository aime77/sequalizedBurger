'use strict';

module.exports = {
up: function (queryInterface, Sequelize) {
return queryInterface.addColumn('Orders', 'quantity', {
    type: Sequelize.INTEGER(2).UNSIGNED.ZEROFILL,
    allowNull: false,
    validate: { min: 1, max: 20 },
});
},

down: function (queryInterface, Sequelize) {
}
};