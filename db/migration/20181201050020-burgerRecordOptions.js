'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   return queryInterface.bulkInsert('Hamburgers',[
    {burger_name:'youBurger', price:'3'},
    {burger_name:'weBurger', price:'2'},
    {burger_name:'usBurger', price:'1'},
    {burger_name:'bestBurger', price:'4'},
    {burger_name:'iBurger', price:'3'},
   ],{})
  },

  down: (queryInterface, Sequelize) => {}
};
